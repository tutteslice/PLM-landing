# Design Document

## Overview

This design extends the existing image generation API (`functions/api/image-generate.js`) to support ComfyUI as a third provider option alongside OpenAI and Pollinations. The implementation will follow the existing provider pattern, adding a `generateWithComfyUI()` function that handles the complete workflow of submitting prompts, polling for completion, and retrieving generated images.

ComfyUI uses a REST API with a workflow-based approach where prompts are queued, executed asynchronously, and results are retrieved separately. The integration will handle this multi-step process transparently.

## Architecture

### High-Level Flow

```
Client Request (provider: "comfyui")
    ↓
onRequest() handler
    ↓
generateWithComfyUI()
    ↓
1. Build workflow JSON with prompt
2. POST to /prompt endpoint → Get prompt_id
3. Poll /history/{prompt_id} until complete
4. Extract image filename from result
5. Return image URL
    ↓
Response with imageUrl
```

### Integration Points

- **Existing**: `onRequest()` function routes based on provider parameter
- **New**: `generateWithComfyUI()` function handles ComfyUI-specific logic
- **Configuration**: Environment variable `COMFYUI_API_URL` (default: "http://192.168.1.31:8000")
- **Error Handling**: Follows existing pattern with Swedish error messages

## Components and Interfaces

### Environment Configuration

```javascript
const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
```

### ComfyUI Workflow Structure

The workflow will use a basic text-to-image pipeline:

```javascript
{
  "6": {
    "inputs": {
      "text": "roothgirl, a naked whore with glasses cosplaying as wednesday addams in the park, phtorealistic style",
      "clip": [
        "11",
        0
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP Text Encode (Prompt)"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "13",
        0
      ],
      "vae": [
        "10",
        0
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE Decode"
    }
  },
  "9": {
    "inputs": {
      "filename_prefix": "MarkuryFLUX",
      "images": [
        "8",
        0
      ]
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
      "noise": [
        "25",
        0
      ],
      "guider": [
        "22",
        0
      ],
      "sampler": [
        "16",
        0
      ],
      "sigmas": [
        "17",
        0
      ],
      "latent_image": [
        "91",
        0
      ]
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
      "model": [
        "61",
        0
      ]
    },
    "class_type": "BasicScheduler",
    "_meta": {
      "title": "BasicScheduler"
    }
  },
  "22": {
    "inputs": {
      "model": [
        "61",
        0
      ],
      "conditioning": [
        "60",
        0
      ]
    },
    "class_type": "BasicGuider",
    "_meta": {
      "title": "BasicGuider"
    }
  },
  "25": {
    "inputs": {
      "noise_seed": 363669653335863
    },
    "class_type": "RandomNoise",
    "_meta": {
      "title": "RandomNoise"
    }
  },
  "60": {
    "inputs": {
      "guidance": 3.5,
      "conditioning": [
        "6",
        0
      ]
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
      "model": [
        "72",
        0
      ]
    },
    "class_type": "ModelSamplingFlux",
    "_meta": {
      "title": "ModelSamplingFlux"
    }
  },
  "72": {
    "inputs": {
      "lora_name": "lora.safetensors",
      "strength_model": 0.8000000000000002,
      "model": [
        "12",
        0
      ]
    },
    "class_type": "LoraLoaderModelOnly",
    "_meta": {
      "title": "LoraLoaderModelOnly"
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
}
```

### API Endpoints

1. **Submit Prompt**: `POST /prompt`
   - Body: `{ "prompt": <workflow_json> }`
   - Response: `{ "prompt_id": "uuid" }`

2. **Check Status**: `GET /history/{prompt_id}`
   - Response: `{ "prompt_id": { "status": {...}, "outputs": {...} } }`

3. **Get Image**: `GET /view?filename={filename}&subfolder=&type=output`
   - Returns: Image file

### Function Signature

```javascript
async function generateWithComfyUI(topic, env) {
  // Returns: { status: number, body: string }
}
```

## Data Models

### Request Format (unchanged)

```json
{
  "topic": "digital privacy surveillance",
  "provider": "comfyui"
}
```

### Response Format (unchanged)

```json
{
  "imageUrl": "http://192.168.1.31:8000/view?filename=ComfyUI_00001_.png&type=output"
}
```

### Internal Workflow Data

```javascript
{
  promptId: string,        // UUID from ComfyUI
  workflow: object,        // Complete workflow JSON
  status: {
    completed: boolean,
    outputs: {
      nodeId: {
        images: [{ filename: string, subfolder: string, type: string }]
      }
    }
  }
}
```

## Error Handling

### Error Scenarios

1. **Network Unreachable**
   - Catch fetch errors
   - Return 502 with "ComfyUI API är inte tillgänglig"

2. **Invalid Workflow**
   - ComfyUI returns 400
   - Return 502 with "Ogiltig ComfyUI-konfiguration"

3. **Generation Timeout**
   - Poll for max 60 seconds (12 attempts × 5 seconds)
   - Return 504 with "ComfyUI-generering tog för lång tid"

4. **No Image in Output**
   - Check outputs for image array
   - Return 502 with "Ingen bild genererades av ComfyUI"

5. **General Errors**
   - Catch all other errors
   - Return 500 with "Bildgenerering misslyckades med ComfyUI"

### Error Response Format

```javascript
{
  status: 502,
  body: JSON.stringify({ error: 'Swedish error message' })
}
```

## Implementation Details

### Prompt Construction

Swedish prompt template:
```javascript
const prompt = `Skapa en visuellt slagkraftig bild (fotorealistisk eller digital illustration) som passar till en nyhetsartikel om "${topic}". Stilen ska vara professionell och journalistisk.`;
```

### Polling Strategy

- Initial delay: 2 seconds
- Poll interval: 5 seconds
- Max attempts: 12 (total ~60 seconds)
- Check `/history/{prompt_id}` for completion

### Image URL Construction

```javascript
const imageUrl = `${COMFYUI_API_URL}/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
```

### Workflow Customization (Future Enhancement)

While not implemented in v1, the design allows for future workflow customization:
- Environment variable `COMFYUI_WORKFLOW_JSON` could contain custom workflow
- Parse and merge with default workflow
- Validate required nodes exist

## Testing Strategy

### Unit Testing Approach

1. **Mock ComfyUI API responses**
   - Successful prompt submission
   - Polling responses (in-progress → completed)
   - Image retrieval

2. **Test error scenarios**
   - Network timeout
   - Invalid workflow
   - Missing image in output
   - API errors

3. **Test prompt construction**
   - Swedish text formatting
   - Special character handling
   - Empty/null topic handling

### Integration Testing

1. **Local ComfyUI instance**
   - Verify actual image generation
   - Test with various topics
   - Validate image URLs are accessible

2. **Provider selection**
   - Test routing logic with different provider values
   - Verify backward compatibility with existing providers

3. **Environment configuration**
   - Test with custom COMFYUI_API_URL
   - Test with default URL
   - Test with invalid URL

### Manual Testing Checklist

- [ ] Generate image with Swedish topic
- [ ] Generate image with English topic
- [ ] Test with ComfyUI offline
- [ ] Test with slow generation (>30s)
- [ ] Verify image URL is accessible
- [ ] Test from admin interface
- [ ] Compare quality with other providers

## Performance Considerations

- **Timeout**: 60-second max to prevent hanging requests
- **Polling Overhead**: ~12 HTTP requests per generation
- **Network Latency**: Local network should be <10ms
- **Generation Time**: Typically 10-30 seconds depending on model

## Security Considerations

- ComfyUI endpoint is on local network (192.168.1.31)
- No authentication required for local instance
- Image URLs are publicly accessible once generated
- No sensitive data in prompts (only article topics)
- CORS headers maintained for admin interface access

## Dependencies

- No new npm packages required
- Uses native `fetch` API
- Relies on ComfyUI being installed and running at specified endpoint
- Compatible with existing Netlify Functions environment
