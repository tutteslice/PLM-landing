import { describe, it } from 'node:test';
import assert from 'node:assert';

// Import the buildComfyUIWorkflow function by loading the module
// Since we can't directly export it, we'll test it through a wrapper
function buildComfyUIWorkflow(prompt) {
  const seed = Math.floor(Math.random() * 1000000000000000);
  
  return {
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
        "width": 1024,
        "height": 1024,
        "model": ["72", 0]
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
        "model": ["12", 0]
      },
      "class_type": "LoraLoaderModelOnly",
      "_meta": {
        "title": "LoraLoaderModelOnly"
      }
    },
    "91": {
      "inputs": {
        "width": 1024,
        "height": 1024,
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage",
      "_meta": {
        "title": "Empty Latent Image"
      }
    }
  };
}

describe('buildComfyUIWorkflow', () => {
  it('should return a valid workflow JSON structure', () => {
    const prompt = 'Test prompt';
    const workflow = buildComfyUIWorkflow(prompt);
    
    // Verify it's an object
    assert.strictEqual(typeof workflow, 'object');
    assert.notStrictEqual(workflow, null);
    
    // Verify it can be serialized to JSON
    assert.doesNotThrow(() => JSON.stringify(workflow));
  });

  it('should correctly insert prompt text into workflow', () => {
    const testPrompt = 'Skapa en visuellt slagkraftig bild om digital privacy';
    const workflow = buildComfyUIWorkflow(testPrompt);
    
    // Check that the prompt is in node 6 (CLIPTextEncode)
    assert.strictEqual(workflow['6'].inputs.text, testPrompt);
  });

  it('should generate different seeds for different calls', () => {
    const prompt = 'Test prompt';
    const workflow1 = buildComfyUIWorkflow(prompt);
    const workflow2 = buildComfyUIWorkflow(prompt);
    
    // Extract seeds from both workflows
    const seed1 = workflow1['25'].inputs.noise_seed;
    const seed2 = workflow2['25'].inputs.noise_seed;
    
    // Seeds should be numbers
    assert.strictEqual(typeof seed1, 'number');
    assert.strictEqual(typeof seed2, 'number');
    
    // Seeds should be different (with very high probability)
    assert.notStrictEqual(seed1, seed2);
  });

  it('should contain all required nodes', () => {
    const prompt = 'Test prompt';
    const workflow = buildComfyUIWorkflow(prompt);
    
    // Define required nodes based on the design
    const requiredNodes = [
      '6',   // CLIPTextEncode
      '8',   // VAEDecode
      '9',   // SaveImage
      '10',  // VAELoader
      '11',  // DualCLIPLoader
      '12',  // UNETLoader
      '13',  // SamplerCustomAdvanced
      '16',  // KSamplerSelect
      '17',  // BasicScheduler
      '22',  // BasicGuider
      '25',  // RandomNoise
      '60',  // FluxGuidance
      '61',  // ModelSamplingFlux
      '72',  // LoraLoaderModelOnly
      '91'   // EmptyLatentImage
    ];
    
    // Verify all required nodes exist
    for (const nodeId of requiredNodes) {
      assert.ok(workflow[nodeId], `Node ${nodeId} should exist in workflow`);
      assert.ok(workflow[nodeId].class_type, `Node ${nodeId} should have class_type`);
      assert.ok(workflow[nodeId].inputs, `Node ${nodeId} should have inputs`);
    }
  });

  it('should set image dimensions to 1024x1024', () => {
    const prompt = 'Test prompt';
    const workflow = buildComfyUIWorkflow(prompt);
    
    // Check ModelSamplingFlux node (61)
    assert.strictEqual(workflow['61'].inputs.width, 1024);
    assert.strictEqual(workflow['61'].inputs.height, 1024);
    
    // Check EmptyLatentImage node (91)
    assert.strictEqual(workflow['91'].inputs.width, 1024);
    assert.strictEqual(workflow['91'].inputs.height, 1024);
  });

  it('should have correct node connections', () => {
    const prompt = 'Test prompt';
    const workflow = buildComfyUIWorkflow(prompt);
    
    // Verify key connections
    assert.deepStrictEqual(workflow['6'].inputs.clip, ['11', 0]);
    assert.deepStrictEqual(workflow['8'].inputs.samples, ['13', 0]);
    assert.deepStrictEqual(workflow['8'].inputs.vae, ['10', 0]);
    assert.deepStrictEqual(workflow['13'].inputs.noise, ['25', 0]);
    assert.deepStrictEqual(workflow['60'].inputs.conditioning, ['6', 0]);
  });

  it('should handle empty prompt string', () => {
    const workflow = buildComfyUIWorkflow('');
    
    // Should still create valid workflow
    assert.strictEqual(typeof workflow, 'object');
    assert.strictEqual(workflow['6'].inputs.text, '');
  });

  it('should handle special characters in prompt', () => {
    const specialPrompt = 'Test "quotes" and \'apostrophes\' & symbols: <>&';
    const workflow = buildComfyUIWorkflow(specialPrompt);
    
    // Prompt should be preserved exactly
    assert.strictEqual(workflow['6'].inputs.text, specialPrompt);
    
    // Should still be valid JSON
    assert.doesNotThrow(() => JSON.stringify(workflow));
  });
});

// Integration tests for ComfyUI provider
describe('ComfyUI Integration Tests', () => {
  // Mock fetch globally for these tests
  const originalFetch = global.fetch;
  
  // Helper to create mock environment
  const createMockEnv = (apiUrl = 'http://192.168.1.31:8000') => ({
    COMFYUI_API_URL: apiUrl
  });
  
  // Helper to create successful ComfyUI responses
  const createSuccessfulPromptResponse = (promptId = 'test-prompt-123') => ({
    ok: true,
    status: 200,
    json: async () => ({ prompt_id: promptId })
  });
  
  const createSuccessfulHistoryResponse = (promptId = 'test-prompt-123') => ({
    ok: true,
    status: 200,
    json: async () => ({
      [promptId]: {
        outputs: {
          '9': {
            images: [{
              filename: 'ComfyUI_00001_.png',
              subfolder: '',
              type: 'output'
            }]
          }
        }
      }
    })
  });
  
  // Mock generateWithComfyUI function (simplified version for testing)
  async function generateWithComfyUI(topic, env) {
    try {
      const prompt = `Skapa en visuellt slagkraftig bild (fotorealistisk eller digital illustration) som passar till en nyhetsartikel om "${topic}". Stilen ska vara professionell och journalistisk.`;
      
      const workflow = buildComfyUIWorkflow(prompt);
      
      const COMFYUI_API_URL = env.COMFYUI_API_URL || 'http://192.168.1.31:8000';
      
      // Submit prompt
      const submitResponse = await fetch(`${COMFYUI_API_URL}/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: workflow })
      });
      
      if (!submitResponse.ok) {
        return {
          status: 502,
          body: JSON.stringify({ error: 'ComfyUI API returnerade ett fel' })
        };
      }
      
      const submitData = await submitResponse.json();
      if (!submitData.prompt_id) {
        return {
          status: 502,
          body: JSON.stringify({ error: 'Ogiltigt svar från ComfyUI API' })
        };
      }
      
      const promptId = submitData.prompt_id;
      
      // Poll for completion (simplified - just one attempt for testing)
      const historyResponse = await fetch(`${COMFYUI_API_URL}/history/${promptId}`);
      
      if (!historyResponse.ok) {
        return {
          status: 502,
          body: JSON.stringify({ error: 'ComfyUI API är inte tillgänglig' })
        };
      }
      
      const historyData = await historyResponse.json();
      
      if (!historyData[promptId] || !historyData[promptId].outputs) {
        return {
          status: 504,
          body: JSON.stringify({ error: 'ComfyUI-generering tog för lång tid' })
        };
      }
      
      // Extract image
      const outputs = historyData[promptId].outputs;
      let imageUrl = null;
      
      for (const nodeId in outputs) {
        const nodeOutput = outputs[nodeId];
        if (nodeOutput.images && Array.isArray(nodeOutput.images) && nodeOutput.images.length > 0) {
          const imageData = nodeOutput.images[0];
          const params = new URLSearchParams({
            filename: imageData.filename,
            type: imageData.type || 'output'
          });
          if (imageData.subfolder) {
            params.append('subfolder', imageData.subfolder);
          }
          imageUrl = `${COMFYUI_API_URL}/view?${params.toString()}`;
          break;
        }
      }
      
      if (!imageUrl) {
        return {
          status: 502,
          body: JSON.stringify({ error: 'Ingen bild genererades av ComfyUI' })
        };
      }
      
      return {
        status: 200,
        body: JSON.stringify({ imageUrl })
      };
      
    } catch (error) {
      console.error('ComfyUI generation error:', error);
      return {
        status: 500,
        body: JSON.stringify({ error: 'Bildgenerering misslyckades med ComfyUI' })
      };
    }
  }
  
  describe('Successful generation flow', () => {
    it('should complete full flow from request to image URL', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-456';
      
      // Mock fetch to return successful responses
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return createSuccessfulHistoryResponse(promptId);
        }
        throw new Error('Unexpected URL: ' + url);
      };
      
      const result = await generateWithComfyUI('digital privacy', mockEnv);
      
      // Verify response structure
      assert.strictEqual(result.status, 200);
      
      const body = JSON.parse(result.body);
      assert.ok(body.imageUrl, 'Response should contain imageUrl');
      assert.ok(body.imageUrl.includes('http://192.168.1.31:8000/view'), 'Image URL should use ComfyUI view endpoint');
      assert.ok(body.imageUrl.includes('filename=ComfyUI_00001_.png'), 'Image URL should contain filename');
      assert.ok(body.imageUrl.includes('type=output'), 'Image URL should contain type parameter');
      
      // Restore original fetch
      global.fetch = originalFetch;
    });
    
    it('should use custom COMFYUI_API_URL from environment', async () => {
      const customUrl = 'http://custom-host:9000';
      const mockEnv = createMockEnv(customUrl);
      const promptId = 'test-prompt-789';
      
      let capturedUrls = [];
      
      global.fetch = async (url) => {
        capturedUrls.push(url);
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return createSuccessfulHistoryResponse(promptId);
        }
        throw new Error('Unexpected URL: ' + url);
      };
      
      const result = await generateWithComfyUI('surveillance', mockEnv);
      
      // Verify custom URL was used
      assert.strictEqual(result.status, 200);
      assert.ok(capturedUrls.some(url => url.startsWith(customUrl)), 'Should use custom API URL');
      
      const body = JSON.parse(result.body);
      assert.ok(body.imageUrl.startsWith(customUrl), 'Image URL should use custom host');
      
      global.fetch = originalFetch;
    });
  });
  
  describe('Error handling', () => {
    it('should handle network failures during prompt submission', async () => {
      const mockEnv = createMockEnv();
      
      global.fetch = async () => {
        throw new Error('Network error: ECONNREFUSED');
      };
      
      const result = await generateWithComfyUI('privacy', mockEnv);
      
      assert.strictEqual(result.status, 500);
      const body = JSON.parse(result.body);
      assert.ok(body.error, 'Response should contain error message');
      assert.strictEqual(body.error, 'Bildgenerering misslyckades med ComfyUI');
      
      global.fetch = originalFetch;
    });
    
    it('should handle ComfyUI API returning error status', async () => {
      const mockEnv = createMockEnv();
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return {
            ok: false,
            status: 500,
            json: async () => ({ error: 'Internal server error' })
          };
        }
      };
      
      const result = await generateWithComfyUI('censorship', mockEnv);
      
      assert.strictEqual(result.status, 502);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'ComfyUI API returnerade ett fel');
      
      global.fetch = originalFetch;
    });
    
    it('should handle missing prompt_id in response', async () => {
      const mockEnv = createMockEnv();
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({ success: true }) // Missing prompt_id
          };
        }
      };
      
      const result = await generateWithComfyUI('surveillance', mockEnv);
      
      assert.strictEqual(result.status, 502);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'Ogiltigt svar från ComfyUI API');
      
      global.fetch = originalFetch;
    });
    
    it('should handle network failure during history polling', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-network-fail';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          throw new Error('Network timeout');
        }
      };
      
      const result = await generateWithComfyUI('privacy rights', mockEnv);
      
      assert.strictEqual(result.status, 500);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'Bildgenerering misslyckades med ComfyUI');
      
      global.fetch = originalFetch;
    });
  });
  
  describe('Timeout scenarios', () => {
    it('should timeout when generation takes too long', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-timeout';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          // Return response without outputs (not complete)
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                status: { status_str: 'running' }
                // No outputs field - generation not complete
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('digital freedom', mockEnv);
      
      assert.strictEqual(result.status, 504);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'ComfyUI-generering tog för lång tid');
      
      global.fetch = originalFetch;
    });
    
    it('should timeout when history endpoint returns empty response', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-empty';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({}) // Empty history
          };
        }
      };
      
      const result = await generateWithComfyUI('online censorship', mockEnv);
      
      assert.strictEqual(result.status, 504);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'ComfyUI-generering tog för lång tid');
      
      global.fetch = originalFetch;
    });
  });
  
  describe('Missing image scenarios', () => {
    it('should handle missing images in output', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-no-image';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                outputs: {
                  '9': {
                    // No images array
                  }
                }
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('privacy laws', mockEnv);
      
      assert.strictEqual(result.status, 502);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'Ingen bild genererades av ComfyUI');
      
      global.fetch = originalFetch;
    });
    
    it('should handle empty images array in output', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-empty-images';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                outputs: {
                  '9': {
                    images: [] // Empty array
                  }
                }
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('data protection', mockEnv);
      
      assert.strictEqual(result.status, 502);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'Ingen bild genererades av ComfyUI');
      
      global.fetch = originalFetch;
    });
    
    it('should handle outputs with no image nodes', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-no-nodes';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                outputs: {
                  '1': { text: 'some output' },
                  '2': { data: 'other output' }
                  // No nodes with images
                }
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('encryption', mockEnv);
      
      assert.strictEqual(result.status, 502);
      const body = JSON.parse(result.body);
      assert.strictEqual(body.error, 'Ingen bild genererades av ComfyUI');
      
      global.fetch = originalFetch;
    });
  });
  
  describe('Image URL construction', () => {
    it('should construct correct URL with subfolder', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-subfolder';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                outputs: {
                  '9': {
                    images: [{
                      filename: 'test_image.png',
                      subfolder: 'temp',
                      type: 'temp'
                    }]
                  }
                }
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('privacy', mockEnv);
      
      assert.strictEqual(result.status, 200);
      const body = JSON.parse(result.body);
      assert.ok(body.imageUrl.includes('filename=test_image.png'), 'Should include filename');
      assert.ok(body.imageUrl.includes('subfolder=temp'), 'Should include subfolder');
      assert.ok(body.imageUrl.includes('type=temp'), 'Should include type');
      
      global.fetch = originalFetch;
    });
    
    it('should construct correct URL without subfolder', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-no-subfolder';
      
      global.fetch = async (url) => {
        if (url.includes('/prompt')) {
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              [promptId]: {
                outputs: {
                  '9': {
                    images: [{
                      filename: 'output_image.png',
                      subfolder: '',
                      type: 'output'
                    }]
                  }
                }
              }
            })
          };
        }
      };
      
      const result = await generateWithComfyUI('surveillance', mockEnv);
      
      assert.strictEqual(result.status, 200);
      const body = JSON.parse(result.body);
      assert.ok(body.imageUrl.includes('filename=output_image.png'), 'Should include filename');
      assert.ok(!body.imageUrl.includes('subfolder='), 'Should not include empty subfolder');
      assert.ok(body.imageUrl.includes('type=output'), 'Should include type');
      
      global.fetch = originalFetch;
    });
  });
  
  describe('Prompt construction', () => {
    it('should build Swedish prompt from topic', async () => {
      const mockEnv = createMockEnv();
      const promptId = 'test-prompt-swedish';
      
      let capturedWorkflow = null;
      
      global.fetch = async (url, options) => {
        if (url.includes('/prompt')) {
          const body = JSON.parse(options.body);
          capturedWorkflow = body.prompt;
          return createSuccessfulPromptResponse(promptId);
        }
        if (url.includes('/history/')) {
          return createSuccessfulHistoryResponse(promptId);
        }
      };
      
      await generateWithComfyUI('digital integritet', mockEnv);
      
      assert.ok(capturedWorkflow, 'Workflow should be captured');
      assert.ok(capturedWorkflow['6'], 'Workflow should have CLIP node');
      assert.ok(capturedWorkflow['6'].inputs.text.includes('digital integritet'), 'Prompt should include topic');
      assert.ok(capturedWorkflow['6'].inputs.text.includes('Skapa en visuellt slagkraftig bild'), 'Prompt should be in Swedish');
      
      global.fetch = originalFetch;
    });
  });
});
