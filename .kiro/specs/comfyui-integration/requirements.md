# Requirements Document

## Introduction

This feature adds ComfyUI API integration as a third image generation provider option for the Private Lives Matter website. ComfyUI is a powerful node-based stable diffusion UI that can be run locally, providing more control over image generation and reducing dependency on external paid services. The ComfyUI instance will be accessible at the local network address 192.168.1.31:8000.

The integration will extend the existing image generation API to support ComfyUI alongside the current OpenAI and Pollinations providers, allowing administrators to choose ComfyUI when generating images for news articles.

## Requirements

### Requirement 1

**User Story:** As a content administrator, I want to select ComfyUI as an image generation provider, so that I can generate images using my local ComfyUI instance instead of external services.

#### Acceptance Criteria

1. WHEN the image generation API receives a request with provider set to "comfyui" THEN the system SHALL route the request to the ComfyUI API at 192.168.1.31:8000
2. WHEN using ComfyUI provider THEN the system SHALL send a properly formatted prompt based on the article topic in Swedish
3. IF the ComfyUI API is unreachable THEN the system SHALL return an appropriate error message with 502 status code
4. WHEN ComfyUI successfully generates an image THEN the system SHALL return the image URL in the same format as other providers

### Requirement 2

**User Story:** As a content administrator, I want the ComfyUI integration to use a configurable workflow, so that I can customize the image generation process without changing code.

#### Acceptance Criteria

1. WHEN the system connects to ComfyUI THEN it SHALL use a workflow configuration that can be specified via environment variables
2. WHEN no custom workflow is specified THEN the system SHALL use a sensible default workflow for text-to-image generation
3. WHEN the workflow configuration is invalid THEN the system SHALL return a clear error message
4. WHEN generating images THEN the system SHALL pass the Swedish prompt text to the appropriate node in the ComfyUI workflow

### Requirement 3

**User Story:** As a content administrator, I want the ComfyUI integration to handle the complete generation lifecycle, so that I receive the final generated image URL.

#### Acceptance Criteria

1. WHEN a ComfyUI generation request is submitted THEN the system SHALL queue the prompt with ComfyUI
2. WHEN the prompt is queued THEN the system SHALL poll for completion status
3. WHEN the generation is complete THEN the system SHALL retrieve the generated image
4. WHEN retrieving the image THEN the system SHALL return the accessible URL to the generated image file
5. IF generation takes longer than 60 seconds THEN the system SHALL timeout and return an error

### Requirement 4

**User Story:** As a developer, I want the ComfyUI API endpoint to be configurable, so that the system can work with different network configurations or ComfyUI instances.

#### Acceptance Criteria

1. WHEN the system initializes THEN it SHALL read the ComfyUI API endpoint from environment variable COMFYUI_API_URL
2. IF COMFYUI_API_URL is not set THEN the system SHALL default to "http://192.168.1.31:8000"
3. WHEN the ComfyUI provider is selected AND no API URL is configured THEN the system SHALL use the default endpoint
4. WHEN making requests to ComfyUI THEN the system SHALL use the configured endpoint for all API calls

### Requirement 5

**User Story:** As a content administrator, I want error handling that provides clear feedback, so that I can troubleshoot issues with the ComfyUI integration.

#### Acceptance Criteria

1. WHEN ComfyUI returns an error THEN the system SHALL log the error details to the console
2. WHEN ComfyUI is unreachable THEN the system SHALL return error message "ComfyUI API är inte tillgänglig"
3. WHEN ComfyUI generation fails THEN the system SHALL return error message "Bildgenerering misslyckades med ComfyUI"
4. WHEN ComfyUI times out THEN the system SHALL return error message "ComfyUI-generering tog för lång tid"
5. WHEN any ComfyUI error occurs THEN the system SHALL maintain the same error response format as other providers
