require('dotenv').config();
const OpenAI = require('openai');

const HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
const OPENAI_PROMPT = { id: 'pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b', version: '1' };

function extractOpenAIImage(response) {
  if (!response || !Array.isArray(response.output)) return null;
  for (const item of response.output) {
    for (const part of item?.content || []) {
      if (typeof part.image_url === 'string' && part.image_url) {
        return part.image_url;
      }
      if (typeof part.url === 'string' && part.url) {
        return part.url;
      }
      const image = part.image || {};
      if (typeof image.url === 'string' && image.url) {
        return image.url;
      }
      const base64 = part.b64_json || image.b64_json || part.image_base64;
      if (typeof base64 === 'string' && base64) {
        return `data:image/png;base64,${base64}`;
      }
    }
  }
  return null;
}

async function generateWithOpenAI(topic) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: 'OPENAI_API_KEY not set' }) };
  }

  const client = new OpenAI({ apiKey });
  const prompt = `Skapa en visuellt slagkraftig bild (fotorealistisk eller digital illustration) som passar till en nyhetsartikel om "${topic}". Returnera endast bilden.`;

  let response;
  try {
    response = await client.responses.create({
      prompt: OPENAI_PROMPT,
      input: [
        {
          role: 'user',
          content: [
            { type: 'input_text', text: prompt }
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
      include: ['reasoning.encrypted_content']
    });
  } catch (error) {
    console.error('OpenAI image generation failed:', error);
    const message = error?.error?.message || error?.message || 'OpenAI request failed';
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: message }) };
  }

  const imageUrl = extractOpenAIImage(response);
  if (!imageUrl) {
    console.error('OpenAI custom prompt returned no image payload');
    return { statusCode: 502, headers: HEADERS, body: JSON.stringify({ error: 'Ingen bild genererades av OpenAI' }) };
  }

  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({ imageUrl })
  };
}

function generateWithUnsplash(topic) {
  const query = encodeURIComponent(topic || 'technology privacy');
  const imageUrl = `https://source.unsplash.com/featured/?${query}`;
  return {
    statusCode: 200,
    headers: HEADERS,
    body: JSON.stringify({ imageUrl })
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  try {
    const { topic, provider } = JSON.parse(event.body || '{}');
    if ((provider || '').toLowerCase() === 'openai') {
      return await generateWithOpenAI((topic || '').trim());
    }
    return generateWithUnsplash(topic);
  } catch (e) {
    console.error(e);
    return { statusCode: 500, headers: HEADERS, body: JSON.stringify({ error: 'Image generation failed' }) };
  }
};
