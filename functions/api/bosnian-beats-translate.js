import { GoogleGenAI, Type } from "@google/genai";

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: HEADERS });
  }

  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not set' }), { status: 500, headers: HEADERS });
  }

  try {
    const { text } = await request.json();
    if (!text) {
      return new Response(JSON.stringify({ error: 'Missing text parameter' }), { status: 400, headers: HEADERS });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text from either Swedish or English into Bosnian: "${text}".
                 Provide three specific versions:
                 1. 'natural': The most common, casual way a native would say it at a festival.
                 2. 'formal': The polite/grammatically standard version.
                 3. 'literal': A direct word-for-word translation.
                 For each, provide a phonetic guide for a Swedish speaker (using Swedish spelling conventions, e.g., 'tj' for 'ć/č', 'sj' for 'š', 'j' for 'j').`,
      config: {
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            natural: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                phonetic: { type: Type.STRING }
              },
              required: ["text", "phonetic"]
            },
            formal: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                phonetic: { type: Type.STRING }
              },
              required: ["text", "phonetic"]
            },
            literal: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                phonetic: { type: Type.STRING }
              },
              required: ["text", "phonetic"]
            }
          },
          required: ["natural", "formal", "literal"],
        },
      }
    });

    const result = JSON.parse(response.text || "{}");
    return new Response(JSON.stringify(result), { status: 200, headers: HEADERS });
  } catch (error) {
    console.error('Translation error:', error);
    const errorVariant = { text: "Error", phonetic: "" };
    const errorResponse = { natural: errorVariant, formal: errorVariant, literal: errorVariant };
    return new Response(JSON.stringify(errorResponse), { status: 200, headers: HEADERS });
  }
}

