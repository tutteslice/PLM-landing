const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,OPTIONS'
};

export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: HEADERS });
  }
  
  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405, 
      headers: HEADERS 
    });
  }
  
  try {
    const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
    
    // Fetch available LoRAs from ComfyUI
    const response = await fetch(`${COMFYUI_API_URL}/object_info`);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ 
        error: 'ComfyUI API är inte tillgänglig',
        loras: []
      }), { 
        status: 502, 
        headers: HEADERS 
      });
    }
    
    const objectInfo = await response.json();
    
    // Extract LoRA names from the object_info response
    // LoRAs are typically found in LoraLoader or LoraLoaderModelOnly nodes
    let loraNames = [];
    
    if (objectInfo.LoraLoader && objectInfo.LoraLoader.input && objectInfo.LoraLoader.input.required) {
      const loraInput = objectInfo.LoraLoader.input.required.lora_name;
      if (Array.isArray(loraInput) && Array.isArray(loraInput[0])) {
        loraNames = loraInput[0];
      }
    } else if (objectInfo.LoraLoaderModelOnly && objectInfo.LoraLoaderModelOnly.input && objectInfo.LoraLoaderModelOnly.input.required) {
      const loraInput = objectInfo.LoraLoaderModelOnly.input.required.lora_name;
      if (Array.isArray(loraInput) && Array.isArray(loraInput[0])) {
        loraNames = loraInput[0];
      }
    }
    
    return new Response(JSON.stringify({ loras: loraNames }), { 
      status: 200, 
      headers: HEADERS 
    });
    
  } catch (error) {
    console.error('Error fetching ComfyUI LoRAs:', error);
    return new Response(JSON.stringify({ 
      error: 'Kunde inte hämta LoRAs',
      loras: []
    }), { 
      status: 500, 
      headers: HEADERS 
    });
  }
}
