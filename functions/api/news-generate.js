import OpenAI from 'openai';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};
const OPENAI_PROMPT = { id: 'pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b', version: '2' };
const GEMINI_MODEL = 'gemini-2.5-flash';

function parseOpenAIText(response) {
  if (!response) return '';
  if (typeof response.output_text === 'string' && response.output_text.trim()) {
    return response.output_text.trim();
  }
  const chunks = [];
  for (const item of response.output || []) {
    for (const part of item.content || []) {
      const value = typeof part.output_text === 'string'
        ? part.output_text
        : typeof part.summary_text === 'string'
          ? part.summary_text
          : typeof part.text === 'string'
            ? part.text
            : undefined;
      if (typeof value === 'string' && value.trim()) chunks.push(value.trim());
    }
  }
  return chunks.join('\n').trim();
}

function parseOpenAISources(response) {
  const seen = new Set();
  const results = [];
  if (!response || !Array.isArray(response.included)) return results;
  for (const item of response.included) {
    if (item?.type !== 'web_search_call') continue;
    const sources = item?.action?.sources;
    if (!Array.isArray(sources)) continue;
    for (const source of sources) {
      const url = source?.url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      results.push({ title: source?.title || url, url });
    }
  }
  return results;
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: HEADERS });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const topic = body.topic;
    const provider = String(body.provider || 'gemini').toLowerCase();
    if (!topic) {
      return new Response(JSON.stringify({ error: 'Missing topic' }), { status: 400, headers: HEADERS });
    }
    const result = provider === 'openai'
      ? await generateWithOpenAI(topic, env)
      : await generateWithGemini(topic, env);

    return new Response(JSON.stringify(result.body), { status: result.status, headers: HEADERS });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Generation failed' }), { status: 500, headers: HEADERS });
  }
}

async function generateWithOpenAI(topic, env) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: { error: 'OPENAI_API_KEY not set' } };
  }

  const openai = new OpenAI({ apiKey });
  try {
    const response = await openai.responses.create({
      prompt: OPENAI_PROMPT,
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: String(topic).trim() }
          ]
        }
      ],
      reasoning: { summary: 'auto' },
      tools: [
        {
          type: 'web_search',
          filters: null,
          search_context_size: 'high',
          user_location: { type: 'approximate', city: 'stockholm', country: 'SE', region: null, timezone: null }
        },
        {
          type: 'image_generation',
          background: 'auto',
          moderation: 'low',
          output_compression: 100,
          output_format: 'png',
          quality: 'auto',
          size: '1536x1024'
        }
      ],
      store: true,
      include: ['reasoning.encrypted_content', 'web_search_call.action.sources']
    });

    const text = parseOpenAIText(response);
    if (!text) {
      console.error('OpenAI custom prompt returned no text');
      return { status: 502, body: { error: 'Ingen text genererades av OpenAI' } };
    }

    const lines = text.split('\n');
    const firstLine = lines.shift() || '';
    const title = firstLine.replace(/^\s*#+\s*/, '').trim().slice(0, 160);
    const content = lines.join('\n').trim() || firstLine.trim();
    const sources = parseOpenAISources(response);

    return { status: 200, body: { title, content, sources } };
  } catch (error) {
    console.error('OpenAI article generation failed:', error);
    const message = error?.error?.message || error?.message || 'OpenAI request failed';
    return { status: 502, body: { error: message } };
  }
}

async function generateWithGemini(topic, env) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: { error: 'GEMINI_API_KEY not set' } };
  }

  try {
    const prompt = `Du är en svensk journalist. Skriv en engagerande nyhetsartikel om "${topic}". ` +
      'Inled med en rubrik på en rad och följ med 3–5 stycken brödtext. Inkludera fakta, citat och sammanhang.';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000) // 25s timeout (Cloudflare has 30s limit)
    });

    const data = await response.json().catch((err) => {
      console.error('Failed to parse Gemini response:', err);
      return {};
    });
    if (!response.ok) {
      console.error('Gemini API error:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      const message = data?.error?.message || `Gemini request failed (${response.status})`;
      return { status: 502, body: { error: message } };
    }

    const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
    const segments = [];
    for (const candidate of candidates) {
      for (const part of candidate?.content?.parts || []) {
        if (typeof part.text === 'string' && part.text.trim()) {
          segments.push(part.text.trim());
        }
      }
    }
    const text = segments.join('\n').trim();
    if (!text) {
      console.error('Gemini response missing text payload', data);
      return { status: 502, body: { error: 'Ingen text genererades av Gemini' } };
    }

    const lines = text.split('\n');
    const firstLine = lines.shift() || '';
    const title = firstLine.replace(/^\s*#+\s*/, '').trim().slice(0, 160);
    const content = lines.join('\n').trim() || firstLine.trim();

    return { status: 200, body: { title, content, sources: [] } };
  } catch (error) {
    console.error('Gemini article generation failed:', error);
    const message = error?.message || 'Gemini request failed';
    return { status: 502, body: { error: message } };
  }
}
