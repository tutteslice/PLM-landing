require('dotenv').config();
const OpenAI = require('openai');

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const OPENAI_PROMPT = { id: 'pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b', version: '1' };

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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  try {
    const { topic } = JSON.parse(event.body || '{}');
    if (!topic) {
      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Missing topic' }) };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: 'OPENAI_API_KEY not set' }) };
    }

    const client = new OpenAI({ apiKey });
    let response;
    try {
      response = await client.responses.create({
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
    } catch (error) {
      console.error('OpenAI article generation failed:', error);
      const message = error?.error?.message || error?.message || 'OpenAI request failed';
      return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: message }) };
    }

    const text = parseOpenAIText(response);
    if (!text) {
      console.error('OpenAI custom prompt returned no text');
      return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: 'Ingen text genererades av OpenAI' }) };
    }

    const lines = text.split('\n');
    const firstLine = lines.shift() || '';
    const title = firstLine.replace(/^\s*#+\s*/, '').trim().slice(0, 160);
    const content = lines.join('\n').trim() || firstLine.trim();
    const sources = parseOpenAISources(response);

    return {
      statusCode: 200,
      headers: HEADERS,
      body: JSON.stringify({ title, content, sources })
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: 'Generation failed' }) };
  }
};
