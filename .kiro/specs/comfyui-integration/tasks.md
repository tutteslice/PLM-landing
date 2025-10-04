# Implementation Plan

## Status: ✅ COMPLETE

All tasks have been successfully implemented and tested. The ComfyUI integration is fully functional and ready for use.

---

- [x] 1. Create ComfyUI workflow builder function
  - Implement `buildComfyUIWorkflow(prompt)` function that constructs the workflow JSON
  - Use the workflow structure from design with configurable prompt text
  - Generate random seed for each request
  - Set image dimensions to 1024x1024 for consistency
  - _Requirements: 2.1, 2.2, 2.3_
  - **Status:** ✅ Implemented in `functions/api/image-generate.js`

- [x] 2. Implement prompt submission to ComfyUI API
  - Create helper function to POST workflow to `/prompt` endpoint
  - Extract and return `prompt_id` from response
  - Handle network errors and return appropriate error object
  - Use configured COMFYUI_API_URL from environment or default
  - _Requirements: 1.1, 3.1, 4.1, 4.2, 4.3_
  - **Status:** ✅ Implemented as `submitComfyUIPrompt()` function

- [x] 3. Implement polling mechanism for generation status
  - Create polling function that checks `/history/{prompt_id}` endpoint
  - Poll every 5 seconds with maximum 12 attempts (60 second timeout)
  - Return when status shows completion with outputs
  - Handle timeout scenario after max attempts
  - _Requirements: 3.2, 3.5, 5.4_
  - **Status:** ✅ Implemented as `pollComfyUIStatus()` function

- [x] 4. Implement image extraction from ComfyUI response
  - Parse the history response to find output images
  - Extract filename, subfolder, and type from the outputs
  - Construct accessible image URL using ComfyUI view endpoint
  - Handle case where no images are found in output
  - _Requirements: 3.3, 3.4, 5.3_
  - **Status:** ✅ Implemented as `extractComfyUIImage()` function

- [x] 5. Create main generateWithComfyUI function
  - Implement async function that orchestrates the complete flow
  - Build Swedish prompt from topic parameter
  - Call workflow builder, submit prompt, poll status, extract image
  - Return response object with status and body matching existing provider pattern
  - Handle all error scenarios with Swedish error messages
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 5.1, 5.2, 5.5_
  - **Status:** ✅ Fully implemented with comprehensive error handling

- [x] 6. Integrate ComfyUI provider into main request handler
  - Add condition in `onRequest()` to check for provider === 'comfyui'
  - Route to `generateWithComfyUI()` when ComfyUI is selected
  - Pass topic and env parameters to the function
  - Maintain existing provider logic for OpenAI and Pollinations
  - _Requirements: 1.1, 4.4_
  - **Status:** ✅ Integrated into `onRequest()` handler

- [x] 7. Add environment variable configuration
  - Update `.env.example` with COMFYUI_API_URL variable
  - Document default value as http://192.168.1.31:8000
  - Add inline comment explaining the configuration option
  - _Requirements: 4.1, 4.2_
  - **Status:** ✅ Documented in `.env.example`

- [x] 8. Write unit tests for workflow builder
  - Test workflow JSON structure is valid
  - Test prompt text is correctly inserted into workflow
  - Test seed randomization produces different values
  - Test workflow contains all required nodes
  - _Requirements: 2.1, 2.2, 2.4_
  - **Status:** ✅ Comprehensive tests in `functions/api/image-generate.test.js`

- [x] 9. Write integration tests for ComfyUI provider
  - Mock ComfyUI API responses for successful generation
  - Test complete flow from request to image URL response
  - Test error handling for network failures
  - Test timeout scenario with delayed responses
  - Test missing image in output scenario
  - _Requirements: 1.1, 1.3, 1.4, 3.5, 5.2, 5.3, 5.4_
  - **Status:** ✅ Comprehensive integration tests with mocked API responses

- [x] 10. Update documentation
  - Add ComfyUI provider to AGENTS.md or relevant documentation
  - Document the provider parameter option
  - Include example request with provider: "comfyui"
  - Document environment variable configuration
  - _Requirements: 1.1, 4.1_
  - **Status:** ✅ Fully documented in `AGENTS.md`

---

## Implementation Summary

The ComfyUI integration has been successfully completed with:

- **Core Implementation:** All functions implemented in `functions/api/image-generate.js`
- **Testing:** Comprehensive unit and integration tests in `functions/api/image-generate.test.js`
- **Documentation:** Complete documentation in `AGENTS.md` and `.env.example`
- **Error Handling:** All error scenarios covered with Swedish error messages
- **Configuration:** Environment variable support with sensible defaults

The feature is production-ready and can be used by setting `provider: "comfyui"` in image generation requests.
