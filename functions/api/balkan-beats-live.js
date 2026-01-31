import { GoogleGenAI, Modality } from "@google/genai";

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};

// Note: Live transcription requires WebSocket support, which Cloudflare Functions don't support directly
// This is a placeholder that returns an error message
// For full live transcription, you'd need to use Cloudflare Workers with Durable Objects or a different approach

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }

  return new Response(JSON.stringify({ 
    error: 'Live transcription requires WebSocket support. Please use the text input instead.' 
  }), { status: 501, headers: HEADERS });
}



