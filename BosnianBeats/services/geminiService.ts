// Updated to use Cloudflare Functions instead of direct API calls

export interface TranslationVariant {
  text: string;
  phonetic: string;
}

export interface TranslationResponse {
  natural: TranslationVariant;
  formal: TranslationVariant;
  literal: TranslationVariant;
}

export async function translateToBosnian(text: string): Promise<TranslationResponse> {
  try {
    const response = await fetch('/api/bosnian-beats-translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Translation failed: ${response.statusText}`);
    }

    return await response.json() as TranslationResponse;
  } catch (e) {
    console.error('Translation error:', e);
    const errorVariant = { text: "Error", phonetic: "" };
    return { natural: errorVariant, formal: errorVariant, literal: errorVariant };
  }
}

export async function speakBosnian(text: string): Promise<string | undefined> {
  try {
    const response = await fetch('/api/bosnian-beats-speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`TTS failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return undefined;
  }
}

// --- Audio Utilities ---

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function createAudioBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// Live transcription is not supported via Cloudflare Functions (requires WebSocket)
// This is a placeholder that will show an error
export function connectLiveTranscription(
  onTranscription: (text: string) => void,
  onOpen: () => void,
  onClose: () => void
) {
  // Return a promise that rejects to indicate it's not supported
  return Promise.reject(new Error('Live transcription requires WebSocket support and is not available via Cloudflare Functions. Please use text input instead.'));
}

