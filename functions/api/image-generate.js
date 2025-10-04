import OpenAI from 'openai';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};
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

async function generateWithOpenAI(topic, env) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return { status: 500, body: JSON.stringify({ error: 'OPENAI_API_KEY not set' }) };
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
    return { status: 502, body: JSON.stringify({ error: message }) };
  }

  const imageUrl = extractOpenAIImage(response);
  if (!imageUrl) {
    console.error('OpenAI custom prompt returned no image payload');
    return { status: 502, body: JSON.stringify({ error: 'Ingen bild genererades av OpenAI' }) };
  }

  return { status: 200, body: JSON.stringify({ imageUrl }) };
}

function buildComfyUIWorkflow(prompt, loras = []) {
  // Generate random seed for each request
  const seed = Math.floor(Math.random() * 1000000000000000);
  
  // Default LoRA if none provided
  if (loras.length === 0) {
    loras = [{ name: 'lora.safetensors', strength: 0.8 }];
  }
  
  const workflow = {
    "6": {
      "inputs": {
        "text": prompt,
        "clip": ["11", 0]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP Text Encode (Prompt)"
      }
    },
    "8": {
      "inputs": {
        "samples": ["13", 0],
        "vae": ["10", 0]
      },
      "class_type": "VAEDecode",
      "_meta": {
        "title": "VAE Decode"
      }
    },
    "9": {
      "inputs": {
        "filename_prefix": "MarkuryFLUX",
        "images": ["8", 0]
      },
      "class_type": "SaveImage",
      "_meta": {
        "title": "Save Image"
      }
    },
    "10": {
      "inputs": {
        "vae_name": "ae.sft"
      },
      "class_type": "VAELoader",
      "_meta": {
        "title": "Load VAE"
      }
    },
    "11": {
      "inputs": {
        "clip_name1": "t5xxl_fp8_e4m3fn.safetensors",
        "clip_name2": "clip_l.safetensors",
        "type": "flux",
        "device": "default"
      },
      "class_type": "DualCLIPLoader",
      "_meta": {
        "title": "DualCLIPLoader"
      }
    },
    "12": {
      "inputs": {
        "unet_name": "flux1-dev.safetensors",
        "weight_dtype": "fp8_e4m3fn"
      },
      "class_type": "UNETLoader",
      "_meta": {
        "title": "Load Diffusion Model"
      }
    },
    "13": {
      "inputs": {
        "noise": ["25", 0],
        "guider": ["22", 0],
        "sampler": ["16", 0],
        "sigmas": ["17", 0],
        "latent_image": ["91", 0]
      },
      "class_type": "SamplerCustomAdvanced",
      "_meta": {
        "title": "SamplerCustomAdvanced"
      }
    },
    "16": {
      "inputs": {
        "sampler_name": "euler_ancestral"
      },
      "class_type": "KSamplerSelect",
      "_meta": {
        "title": "KSamplerSelect"
      }
    },
    "17": {
      "inputs": {
        "scheduler": "normal",
        "steps": 25,
        "denoise": 1,
        "model": ["61", 0]
      },
      "class_type": "BasicScheduler",
      "_meta": {
        "title": "BasicScheduler"
      }
    },
    "22": {
      "inputs": {
        "model": ["61", 0],
        "conditioning": ["60", 0]
      },
      "class_type": "BasicGuider",
      "_meta": {
        "title": "BasicGuider"
      }
    },
    "25": {
      "inputs": {
        "noise_seed": seed
      },
      "class_type": "RandomNoise",
      "_meta": {
        "title": "RandomNoise"
      }
    },
    "60": {
      "inputs": {
        "guidance": 3.5,
        "conditioning": ["6", 0]
      },
      "class_type": "FluxGuidance",
      "_meta": {
        "title": "FluxGuidance"
      }
    },
    "61": {
      "inputs": {
        "max_shift": 1.15,
        "base_shift": 0.5,
        "width": 512,
        "height": 512,
        "model": ["72", 0]
      },
      "class_type": "ModelSamplingFlux",
      "_meta": {
        "title": "ModelSamplingFlux"
      }
    },
    "91": {
      "inputs": {
        "width": 512,
        "height": 512,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage",
      "_meta": {
        "title": "Empty Latent Image"
      }
    }
  };
  
  // Build LoRA chain dynamically
  // Start with base model from node 12 (UNETLoader)
  let currentModelNode = ["12", 0];
  let loraNodeId = 72;
  
  // Add each LoRA in sequence
  loras.forEach((lora, index) => {
    const nodeIdStr = String(loraNodeId + index);
    workflow[nodeIdStr] = {
      "inputs": {
        "lora_name": lora.name,
        "strength_model": lora.strength,
        "model": currentModelNode
      },
      "class_type": "LoraLoaderModelOnly",
      "_meta": {
        "title": `LoraLoaderModelOnly ${index + 1}`
      }
    };
    // Next LoRA or final node will use this LoRA's output
    currentModelNode = [nodeIdStr, 0];
  });
  
  // Update ModelSamplingFlux (node 61) to use the last LoRA in the chain
  workflow["61"].inputs.model = currentModelNode;
  
  return workflow;
}

async function submitComfyUIPrompt(workflow, env) {
  const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
  
  try {
    const response = await fetch(`${COMFYUI_API_URL}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: workflow })
    });

    if (!response.ok) {
      console.error(`ComfyUI prompt submission failed with status ${response.status}`);
      return { 
        error: true, 
        status: 502, 
        message: 'ComfyUI API returnerade ett fel' 
      };
    }

    const data = await response.json();
    
    if (!data.prompt_id) {
      console.error('ComfyUI response missing prompt_id');
      return { 
        error: true, 
        status: 502, 
        message: 'Ogiltigt svar från ComfyUI API' 
      };
    }

    return { 
      error: false, 
      promptId: data.prompt_id 
    };
  } catch (error) {
    console.error('ComfyUI network error:', error);
    return { 
      error: true, 
      status: 502, 
      message: 'ComfyUI API är inte tillgänglig' 
    };
  }
}

async function pollComfyUIStatus(promptId, env) {
  const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
  const MAX_ATTEMPTS = 25;
  const POLL_INTERVAL_MS = 5000; // 5 seconds
  
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      // Wait before polling (except first attempt can be immediate or delayed)
      if (attempt > 1) {
        await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
      }
      
      const response = await fetch(`${COMFYUI_API_URL}/history/${promptId}`);
      
      if (!response.ok) {
        console.error(`ComfyUI history check failed with status ${response.status}`);
        continue; // Try again on next iteration
      }
      
      const data = await response.json();
      
      // Check if our prompt_id exists in the history
      if (data[promptId]) {
        const promptData = data[promptId];
        
        // Check if generation is complete by looking for outputs
        if (promptData.outputs && Object.keys(promptData.outputs).length > 0) {
          return {
            error: false,
            completed: true,
            outputs: promptData.outputs
          };
        }
      }
      
      // Not complete yet, continue polling
      console.log(`ComfyUI polling attempt ${attempt}/${MAX_ATTEMPTS} - not complete yet`);
      
    } catch (error) {
      console.error(`ComfyUI polling error on attempt ${attempt}:`, error);
      // Continue to next attempt unless it's the last one
      if (attempt === MAX_ATTEMPTS) {
        return {
          error: true,
          status: 502,
          message: 'ComfyUI API är inte tillgänglig'
        };
      }
    }
  }
  
  // Timeout after max attempts
  console.error(`ComfyUI generation timed out after ${MAX_ATTEMPTS} attempts`);
  return {
    error: true,
    status: 504,
    message: 'ComfyUI-generering tog för lång tid'
  };
}

function extractComfyUIImage(outputs, env) {
  const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
  
  // Iterate through all output nodes to find images
  for (const nodeId in outputs) {
    const nodeOutput = outputs[nodeId];
    
    // Check if this node has images array
    if (nodeOutput.images && Array.isArray(nodeOutput.images) && nodeOutput.images.length > 0) {
      const imageData = nodeOutput.images[0]; // Take the first image
      
      // Extract required fields
      const filename = imageData.filename;
      const subfolder = imageData.subfolder || '';
      const type = imageData.type || 'output';
      
      // Construct the image URL using ComfyUI's view endpoint
      const params = new URLSearchParams({
        filename: filename,
        type: type
      });
      
      // Only add subfolder if it's not empty
      if (subfolder) {
        params.append('subfolder', subfolder);
      }
      
      const imageUrl = `${COMFYUI_API_URL}/view?${params.toString()}`;
      
      return {
        error: false,
        imageUrl: imageUrl
      };
    }
  }
  
  // No images found in any output node
  console.error('No images found in ComfyUI outputs');
  return {
    error: true,
    status: 502,
    message: 'Ingen bild genererades av ComfyUI'
  };
}

async function generateWithComfyUI(topic, env, loras = []) {
  try {
    // Build Swedish prompt from topic parameter
    const prompt = `Skapa en visuellt slagkraftig bild (fotorealistisk eller digital illustration) som passar till en nyhetsartikel om "${topic}". Stilen ska vara professionell och journalistisk.`;
    
    // Step 1: Build workflow with the prompt and LoRAs
    const workflow = buildComfyUIWorkflow(prompt, loras);
    
    // Step 2: Submit prompt to ComfyUI API
    const submitResult = await submitComfyUIPrompt(workflow, env);
    if (submitResult.error) {
      return {
        status: submitResult.status,
        body: JSON.stringify({ error: submitResult.message })
      };
    }
    
    const promptId = submitResult.promptId;
    
    // Step 3: Poll for completion status
    const pollResult = await pollComfyUIStatus(promptId, env);
    if (pollResult.error) {
      return {
        status: pollResult.status,
        body: JSON.stringify({ error: pollResult.message })
      };
    }
    
    // Step 4: Extract image URL from outputs
    const imageResult = extractComfyUIImage(pollResult.outputs, env);
    if (imageResult.error) {
      return {
        status: imageResult.status,
        body: JSON.stringify({ error: imageResult.message })
      };
    }
    
    // Return success response with image URL
    return {
      status: 200,
      body: JSON.stringify({ imageUrl: imageResult.imageUrl })
    };
    
  } catch (error) {
    // Handle any unexpected errors
    console.error('ComfyUI generation error:', error);
    return {
      status: 500,
      body: JSON.stringify({ error: 'Bildgenerering misslyckades med ComfyUI' })
    };
  }
}

function generateWithPollinations(topic) {
  const prompt = (topic || 'technology privacy news illustration').trim();
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
  return { status: 200, body: JSON.stringify({ imageUrl: url }) };
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
    const { topic, provider, loras } = await request.json().catch(() => ({}));
    if ((provider || '').toLowerCase() === 'openai') {
      const r = await generateWithOpenAI((topic || '').trim(), env);
      return new Response(r.body, { status: r.status, headers: HEADERS });
    }
    if ((provider || '').toLowerCase() === 'comfyui') {
      const r = await generateWithComfyUI((topic || '').trim(), env, loras);
      return new Response(r.body, { status: r.status, headers: HEADERS });
    }
    const r = generateWithPollinations(topic);
    return new Response(r.body, { status: r.status, headers: HEADERS });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Image generation failed' }), { status: 500, headers: HEADERS });
  }
}
