# Design Document

## Overview

The news generation feature fix will improve reliability, error handling, source integration, and content quality. The solution maintains the existing architecture while adding robust error handling, input validation, improved logging, and better source processing. The design focuses on making the existing Netlify function more resilient and user-friendly.

## Architecture

The current architecture remains unchanged:
- Frontend: Admin interface (`public/admin/index.html`) with JavaScript
- Backend: Netlify serverless function (`netlify/functions/news-generate.js`)
- External APIs: Google Gemini AI, Brave Search API, source website fetching
- Dependencies: Web search function for source discovery

### Key Improvements
- Enhanced error handling with specific error types
- Input validation and sanitization
- Retry logic for network requests
- Improved logging and monitoring
- Better source content extraction and validation

## Components and Interfaces

### 1. Input Validation Module
```javascript
// Validates and sanitizes user input
function validateTopic(topic) {
  // Trim whitespace, check length, sanitize special characters
  // Returns { valid: boolean, sanitized: string, error?: string }
}
```

### 2. Enhanced Error Handler
```javascript
// Standardized error responses with specific error types
function createErrorResponse(type, message, statusCode = 500) {
  // Returns consistent error format for frontend
}
```

### 3. Retry Logic Wrapper
```javascript
// Wraps network requests with exponential backoff
async function withRetry(fn, maxRetries = 3, baseDelay = 1000) {
  // Implements retry logic for API calls
}
```

### 4. Improved Source Processor
```javascript
// Enhanced source content extraction and validation
async function processSource(source) {
  // Better HTML parsing, content validation, timeout handling
}
```

### 5. Logging Module
```javascript
// Structured logging for monitoring and debugging
function logEvent(level, event, data) {
  // Consistent log format with timestamps and context
}
```

## Data Models

### Request Model
```javascript
{
  topic: string (required, 1-200 characters, sanitized)
}
```

### Response Model (Success)
```javascript
{
  title: string (max 160 characters),
  content: string (500-700 words),
  sources: Array<{
    title: string,
    url: string
  }>,
  metadata: {
    generatedAt: string (ISO timestamp),
    sourceCount: number,
    wordCount: number
  }
}
```

### Response Model (Error)
```javascript
{
  error: string (user-friendly message),
  code: string (error type for debugging),
  details?: object (additional context for developers)
}
```

### Error Types
- `VALIDATION_ERROR`: Invalid input
- `CONFIG_ERROR`: Missing environment variables
- `API_ERROR`: External API failures
- `NETWORK_ERROR`: Network connectivity issues
- `CONTENT_ERROR`: No suitable sources found
- `GENERATION_ERROR`: AI generation failures

## Error Handling

### 1. Input Validation Errors
- Check topic length (1-200 characters)
- Sanitize special characters and HTML
- Return specific validation messages

### 2. Configuration Errors
- Validate required environment variables on startup
- Return helpful setup instructions for missing config

### 3. API Rate Limiting
- Detect rate limit responses from Gemini and Brave APIs
- Return user-friendly messages with retry suggestions
- Implement exponential backoff for retries

### 4. Network Failures
- Handle timeouts for source fetching (current: 2.5s, new: 5s with retry)
- Graceful degradation when some sources fail
- Minimum source requirement (at least 2 working sources)

### 5. Content Quality Issues
- Validate generated content length and format
- Ensure proper title/content separation
- Verify Swedish language output

## Testing Strategy

### 1. Unit Tests
- Input validation functions
- Error handling utilities
- Source processing logic
- Retry mechanism behavior

### 2. Integration Tests
- End-to-end article generation flow
- API error simulation and handling
- Source fetching with various response types
- Network failure scenarios

### 3. Manual Testing Scenarios
- Valid topic generation
- Invalid input handling
- Missing environment variables
- API rate limit simulation
- Network connectivity issues
- Various source website types

### 4. Performance Testing
- Response time under normal conditions
- Behavior under API rate limits
- Memory usage during source processing
- Concurrent request handling

## Implementation Approach

### Phase 1: Core Fixes
1. Add input validation and sanitization
2. Implement structured error handling
3. Add comprehensive logging
4. Fix environment variable validation

### Phase 2: Reliability Improvements
1. Add retry logic for network requests
2. Improve source content extraction
3. Enhance timeout handling
4. Add source validation

### Phase 3: Quality Enhancements
1. Improve content quality validation
2. Add metadata to responses
3. Enhance Swedish language prompts
4. Add performance monitoring

### Configuration Requirements
Environment variables needed:
- `GEMINI_API_KEY`: Google Gemini API key (required)
- `BRAVE_API_KEY`: Brave Search API key (optional but recommended)
- `ADMIN_TOKEN`: Admin authentication token (for testing)

### Monitoring and Logging
- Log all generation attempts with topics and outcomes
- Track API response times and error rates
- Monitor source fetch success rates
- Alert on configuration issues