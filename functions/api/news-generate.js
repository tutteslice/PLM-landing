import OpenAI from 'openai';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Access-Control-Allow-Methods': 'POST,OPTIONS'
};
const OPENAI_PROMPT = { id: 'pmpt_68dd621211e48194a9bcb0f3b88f51c40c83dce5f116999b', version: '2' };
const GEMINI_MODEL = 'gemini-2.5-flash';

// Error codes for standardized error handling
const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFIG_ERROR: 'CONFIG_ERROR',
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  CONTENT_ERROR: 'CONTENT_ERROR',
  GENERATION_ERROR: 'GENERATION_ERROR'
};

/**
 * Retry wrapper function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum number of retry attempts (default: 3)
 * @param {number} baseDelay - Base delay in milliseconds (default: 1000)
 * @returns {Promise} Result of the function call
 */
async function withRetry(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on certain error types
      const shouldNotRetry = 
        error?.status === 400 || // Bad request
        error?.status === 401 || // Unauthorized
        error?.status === 403 || // Forbidden
        (error?.status === 429 && attempt >= 2); // Rate limit (max 2 retries)
      
      if (shouldNotRetry || attempt === maxRetries) {
        throw error;
      }
      
      // Check if it's a retryable error
      const isNetworkError = 
        error.name === 'AbortError' ||
        error.name === 'TimeoutError' ||
        error.message?.toLowerCase().includes('timeout') ||
        error.message?.toLowerCase().includes('network') ||
        error.message?.toLowerCase().includes('fetch') ||
        error.message?.toLowerCase().includes('econnrefused') ||
        error.message?.toLowerCase().includes('enotfound') ||
        error?.status === 429 || // Rate limit
        error?.status === 500 || // Internal server error
        error?.status === 502 || // Bad gateway
        error?.status === 503 || // Service unavailable
        error?.status === 504;   // Gateway timeout
      
      if (!isNetworkError) {
        throw error;
      }
      
      // Calculate exponential backoff delay
      const delay = baseDelay * Math.pow(2, attempt);
      const jitter = Math.random() * 0.3 * delay; // Add 0-30% jitter
      const totalDelay = delay + jitter;
      
      console.log(`Retry attempt ${attempt + 1}/${maxRetries} after ${Math.round(totalDelay)}ms delay`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, totalDelay));
    }
  }
  
  throw lastError;
}

/**
 * Detects if an error is a network-related error
 * @param {Error} error - The error to check
 * @returns {boolean} True if it's a network error
 */
function isNetworkError(error) {
  if (!error) return false;
  
  const networkIndicators = [
    'timeout',
    'network',
    'fetch',
    'econnrefused',
    'enotfound',
    'econnreset',
    'etimedout',
    'socket hang up',
    'connection refused'
  ];
  
  const message = (error.message || '').toLowerCase();
  const name = (error.name || '').toLowerCase();
  
  return (
    error.name === 'AbortError' ||
    error.name === 'TimeoutError' ||
    networkIndicators.some(indicator => message.includes(indicator) || name.includes(indicator)) ||
    error?.status === 502 ||
    error?.status === 503 ||
    error?.status === 504
  );
}

/**
 * Creates a standardized error response
 * @param {string} code - Error code from ERROR_CODES
 * @param {string} message - User-friendly error message
 * @param {number} statusCode - HTTP status code
 * @param {object} details - Additional error details for debugging
 * @returns {object} Standardized error response object
 */
function createErrorResponse(code, message, statusCode = 500, details = null) {
  const response = {
    error: message,
    code: code
  };
  if (details) {
    response.details = details;
  }
  return { status: statusCode, body: response };
}

/**
 * Validates and sanitizes the topic input
 * @param {string} topic - The topic to validate
 * @returns {object} Validation result with { valid, sanitized, error }
 */
function validateTopic(topic) {
  // Check if topic exists
  if (!topic || typeof topic !== 'string') {
    return {
      valid: false,
      sanitized: '',
      error: 'Ämne saknas eller är ogiltigt'
    };
  }

  // Trim whitespace
  const trimmed = topic.trim();

  // Check if empty after trimming
  if (trimmed.length === 0) {
    return {
      valid: false,
      sanitized: '',
      error: 'Ämne får inte vara tomt'
    };
  }

  // Check length constraints (1-200 characters)
  if (trimmed.length > 200) {
    return {
      valid: false,
      sanitized: '',
      error: 'Ämne får inte vara längre än 200 tecken'
    };
  }

  // Sanitize HTML tags and potentially dangerous characters
  let sanitized = trimmed
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove any remaining angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers like onclick=

  // Check if sanitization removed everything
  if (sanitized.trim().length === 0) {
    return {
      valid: false,
      sanitized: '',
      error: 'Ämne innehåller endast ogiltiga tecken'
    };
  }

  // Final trim after sanitization
  sanitized = sanitized.trim();

  return {
    valid: true,
    sanitized: sanitized,
    error: null
  };
}

function parseOpenAIText(response) {
  if (!response) return '';
  if (typeof response.output_text === 'string' && response.output_text.trim()) {
    return response.output_text.trim();
  }
  const chunks = [];
  for (const item of response.output || []) {
    for (const part of item.content || []) {
      const value = typeof part.output_text === 'string'
        ? part.output_text
        : typeof part.summary_text === 'string'
          ? part.summary_text
          : typeof part.text === 'string'
            ? part.text
            : undefined;
      if (typeof value === 'string' && value.trim()) chunks.push(value.trim());
    }
  }
  return chunks.join('\n').trim();
}

function parseOpenAISources(response) {
  const seen = new Set();
  const results = [];
  if (!response || !Array.isArray(response.included)) return results;
  for (const item of response.included) {
    if (item?.type !== 'web_search_call') continue;
    const sources = item?.action?.sources;
    if (!Array.isArray(sources)) continue;
    for (const source of sources) {
      const url = source?.url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      results.push({ title: source?.title || url, url });
    }
  }
  return results;
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
    const body = await request.json().catch(() => ({}));
    const topic = body.topic;
    const provider = String(body.provider || 'gemini').toLowerCase();
    
    // Validate and sanitize topic input
    const validation = validateTopic(topic);
    if (!validation.valid) {
      const errorResponse = createErrorResponse(
        ERROR_CODES.VALIDATION_ERROR,
        validation.error,
        400
      );
      return new Response(JSON.stringify(errorResponse.body), { 
        status: errorResponse.status, 
        headers: HEADERS 
      });
    }

    // Use sanitized topic for generation
    const sanitizedTopic = validation.sanitized;
    
    const result = provider === 'openai'
      ? await generateWithOpenAI(sanitizedTopic, env)
      : await generateWithGemini(sanitizedTopic, env);

    return new Response(JSON.stringify(result.body), { status: result.status, headers: HEADERS });
  } catch (e) {
    console.error('News generation error:', e);
    const errorResponse = createErrorResponse(
      ERROR_CODES.GENERATION_ERROR,
      'Artikelgenerering misslyckades. Försök igen senare.',
      500,
      { message: e.message }
    );
    return new Response(JSON.stringify(errorResponse.body), { 
      status: errorResponse.status, 
      headers: HEADERS 
    });
  }
}

async function generateWithOpenAI(topic, env) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return createErrorResponse(
      ERROR_CODES.CONFIG_ERROR,
      'OpenAI API-nyckel saknas. Kontrollera konfigurationen.',
      500,
      { missing: 'OPENAI_API_KEY' }
    );
  }

  const openai = new OpenAI({ apiKey });
  try {
    // Wrap the OpenAI API call with retry logic
    const response = await withRetry(async () => {
      return await openai.responses.create({
        prompt: OPENAI_PROMPT,
        input: [
          {
            role: 'user',
            content: [
              { type: 'input_text', text: String(topic).trim() }
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
        include: ['reasoning.encrypted_content', 'web_search_call.action.sources']
      });
    }, 3, 1000); // 3 retries with 1 second base delay

    const text = parseOpenAIText(response);
    if (!text) {
      console.error('OpenAI custom prompt returned no text');
      return createErrorResponse(
        ERROR_CODES.CONTENT_ERROR,
        'Ingen text genererades av OpenAI. Försök igen.',
        502
      );
    }

    // Extract title using enhanced extraction
    const title = extractTitle(text);
    
    // Get content (everything after first line)
    const lines = text.split('\n');
    lines.shift(); // Remove title line
    const content = lines.join('\n').trim() || text.trim();
    
    // Validate content length
    const lengthValidation = validateContentLength(content);
    if (!lengthValidation.valid) {
      console.warn('Content length validation failed:', lengthValidation.error);
      // Note: We don't fail here, just log the warning
      // In production, you might want to retry or adjust the prompt
    }
    
    const sources = parseOpenAISources(response);
    const generatedAt = new Date().toISOString();

    return { 
      status: 200, 
      body: { 
        title, 
        content, 
        sources,
        metadata: {
          generatedAt,
          sourceCount: sources.length,
          wordCount: lengthValidation.wordCount
        }
      } 
    };
  } catch (error) {
    console.error('OpenAI article generation failed:', error);
    const message = error?.error?.message || error?.message || 'OpenAI request failed';
    
    // Check for rate limiting
    if (error?.status === 429 || message.toLowerCase().includes('rate limit')) {
      return createErrorResponse(
        ERROR_CODES.API_ERROR,
        'API-gränsen har nåtts. Vänta en stund och försök igen.',
        429,
        { provider: 'OpenAI', originalMessage: message }
      );
    }
    
    // Check if it's a network error
    if (isNetworkError(error)) {
      return createErrorResponse(
        ERROR_CODES.NETWORK_ERROR,
        'Nätverksfel eller timeout. Kontrollera din anslutning och försök igen.',
        504,
        { provider: 'OpenAI', originalMessage: message }
      );
    }
    
    return createErrorResponse(
      ERROR_CODES.API_ERROR,
      `OpenAI-fel: ${message}`,
      502,
      { provider: 'OpenAI', originalMessage: message }
    );
  }
}

/**
 * Validates a URL to ensure it's a proper HTTP/HTTPS URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid
 */
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Fetches credible sources using web search
 * @param {string} topic - The topic to search for
 * @param {object} env - Environment variables
 * @returns {Promise<Array>} Array of source objects with title, url, and snippet
 */
async function fetchSources(topic, env) {
  const braveApiKey = env.BRAVE_API_KEY;
  if (!braveApiKey) {
    console.warn('BRAVE_API_KEY not configured, skipping source fetching');
    return [];
  }

  try {
    const result = await withRetry(async () => {
      const query = encodeURIComponent(topic);
      const url = `https://api.search.brave.com/res/v1/web/search?q=${query}&count=5`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-Subscription-Token': braveApiKey
        },
        signal: AbortSignal.timeout(5000) // 5s timeout for search
      });

      const data = await response.json().catch(() => ({}));
      
      if (!response.ok) {
        const message = data?.message || data?.error || `Search failed (${response.status})`;
        const error = new Error(message);
        error.status = response.status;
        throw error;
      }

      const results = (data?.web?.results || [])
        .filter(r => isValidUrl(r.url))
        .map(r => ({
          title: r.title || 'Untitled',
          url: r.url,
          snippet: r.description || r.snippet || ''
        }));

      return results;
    }, 2, 1000); // 2 retries with 1 second base delay

    return result;
  } catch (error) {
    console.error('Source fetching failed:', error);
    return [];
  }
}

/**
 * Fetches content from a source URL
 * @param {object} source - Source object with url property
 * @returns {Promise<object>} Source with content added, or null if failed
 */
async function fetchSourceContent(source) {
  if (!source || !isValidUrl(source.url)) {
    return null;
  }

  try {
    const result = await withRetry(async () => {
      const response = await fetch(source.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; PrivateLivesMatter/1.0)'
        },
        signal: AbortSignal.timeout(5000) // 5s timeout per source
      });

      if (!response.ok) {
        const error = new Error(`Failed to fetch source: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      const html = await response.text();
      
      // Basic content extraction - remove HTML tags and get text
      const textContent = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Get a reasonable excerpt (first 500 chars)
      const excerpt = textContent.slice(0, 500);

      return {
        ...source,
        content: excerpt,
        fetchedAt: new Date().toISOString()
      };
    }, 2, 1000); // 2 retries with 1 second base delay

    return result;
  } catch (error) {
    console.error(`Failed to fetch content from ${source.url}:`, error);
    return null;
  }
}

/**
 * Validates and processes sources, ensuring minimum requirements
 * @param {Array} sources - Array of source objects
 * @returns {object} Validation result with { valid, sources, error }
 */
async function validateAndProcessSources(sources) {
  if (!Array.isArray(sources) || sources.length === 0) {
    return {
      valid: false,
      sources: [],
      error: 'Inga källor hittades'
    };
  }

  // Remove duplicates based on URL
  const seen = new Set();
  const uniqueSources = sources.filter(source => {
    if (!source || !source.url || seen.has(source.url)) {
      return false;
    }
    seen.add(source.url);
    return true;
  });

  // Fetch content for sources (in parallel, but limit to first 5)
  const sourcesToFetch = uniqueSources.slice(0, 5);
  const fetchPromises = sourcesToFetch.map(source => fetchSourceContent(source));
  const fetchedSources = await Promise.all(fetchPromises);

  // Filter out failed fetches
  const validSources = fetchedSources.filter(source => source !== null && source.content);

  // Check minimum requirement (at least 2 sources)
  if (validSources.length < 2) {
    return {
      valid: false,
      sources: validSources,
      error: `Endast ${validSources.length} källa(or) kunde hämtas. Minst 2 källor krävs.`
    };
  }

  return {
    valid: true,
    sources: validSources,
    error: null
  };
}

/**
 * Counts words in a text string
 * @param {string} text - The text to count words in
 * @returns {number} Word count
 */
function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  
  // Remove source citations section before counting
  const textWithoutSources = text.replace(/\n\nKällor:\n[\s\S]*$/, '');
  
  // Split by whitespace and filter out empty strings
  const words = textWithoutSources.trim().split(/\s+/).filter(word => word.length > 0);
  return words.length;
}

/**
 * Validates content length (should be 500-700 words)
 * @param {string} content - The content to validate
 * @returns {object} Validation result with { valid, wordCount, error }
 */
function validateContentLength(content) {
  const wordCount = countWords(content);
  
  if (wordCount < 500) {
    return {
      valid: false,
      wordCount,
      error: `Innehållet är för kort (${wordCount} ord). Minst 500 ord krävs.`
    };
  }
  
  if (wordCount > 700) {
    return {
      valid: false,
      wordCount,
      error: `Innehållet är för långt (${wordCount} ord). Max 700 ord tillåts.`
    };
  }
  
  return {
    valid: true,
    wordCount,
    error: null
  };
}

/**
 * Extracts and cleans the title from generated content
 * @param {string} text - The text containing the title
 * @returns {string} Cleaned title (max 160 characters)
 */
function extractTitle(text) {
  if (!text || typeof text !== 'string') return '';
  
  const lines = text.split('\n');
  const firstLine = lines[0] || '';
  
  // Remove markdown headers (# ## ###), asterisks, underscores, and other markdown
  let title = firstLine
    .replace(/^\s*#+\s*/, '') // Remove # headers
    .replace(/\*\*/g, '') // Remove bold **
    .replace(/\*/g, '') // Remove italic *
    .replace(/__/g, '') // Remove bold __
    .replace(/_/g, '') // Remove italic _
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/`/g, '') // Remove code backticks
    .trim();
  
  // Limit to 160 characters
  if (title.length > 160) {
    title = title.slice(0, 157) + '...';
  }
  
  return title;
}

/**
 * Formats sources for citation in the article
 * @param {Array} sources - Array of validated source objects
 * @returns {string} Formatted source citations
 */
function formatSourceCitations(sources) {
  if (!Array.isArray(sources) || sources.length === 0) {
    return '';
  }

  const citations = sources
    .map((source, index) => `${index + 1}. ${source.title} (${source.url})`)
    .join('\n');

  return `\n\nKällor:\n${citations}`;
}

async function generateWithGemini(topic, env) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    return createErrorResponse(
      ERROR_CODES.CONFIG_ERROR,
      'Gemini API-nyckel saknas. Kontrollera konfigurationen.',
      500,
      { missing: 'GEMINI_API_KEY' }
    );
  }

  try {
    // Step 1: Fetch sources for the topic
    console.log(`Fetching sources for topic: ${topic}`);
    const rawSources = await fetchSources(topic, env);
    
    // Step 2: Validate and process sources (fetch content)
    const sourceValidation = await validateAndProcessSources(rawSources);
    
    if (!sourceValidation.valid) {
      return createErrorResponse(
        ERROR_CODES.CONTENT_ERROR,
        sourceValidation.error,
        502,
        { sourcesFound: sourceValidation.sources.length, minimumRequired: 2 }
      );
    }

    const validSources = sourceValidation.sources;
    console.log(`Successfully fetched ${validSources.length} sources`);

    // Step 3: Build context from sources for the AI
    const sourceContext = validSources
      .map((source, index) => 
        `Källa ${index + 1}: ${source.title}\nURL: ${source.url}\nUtdrag: ${source.snippet || source.content.slice(0, 200)}`
      )
      .join('\n\n');

    // Step 4: Generate article with Gemini using source context
    const result = await withRetry(async () => {
      // Enhanced Swedish prompt for better article structure and length
      const prompt = `Du är en professionell svensk journalist. Skriv en välstrukturerad och engagerande nyhetsartikel om "${topic}".

STRUKTUR:
1. Rubrik: En kort, fängslande rubrik på en rad (max 160 tecken)
2. Ingress: Ett inledande stycke som sammanfattar artikelns huvudpoäng
3. Brödtext: 4-6 välskrivna stycken som utvecklar ämnet i detalj
4. Avslutning: Ett sammanfattande eller framåtblickande stycke

LÄNGD: Artikeln ska vara mellan 500-700 ord (exklusive rubrik).

INNEHÅLL:
- Inkludera specifika namn, organisationer och datum från källorna
- Använd 1-2 korta, relevanta citat från källorna
- Referera till källorna i texten med (Källa 1), (Källa 2) etc.
- Skriv i en objektiv, journalistisk ton
- Använd tydliga och engagerande formuleringar
- Undvik upprepningar och fyllnadsord

Tillgängliga källor:
${sourceContext}

Skriv artikeln nu:`;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25000) // 25s timeout (Cloudflare has 30s limit)
      });

      const data = await response.json().catch((err) => {
        console.error('Failed to parse Gemini response:', err);
        return {};
      });
      
      if (!response.ok) {
        console.error('Gemini API error:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        
        const message = data?.error?.message || `Gemini request failed (${response.status})`;
        
        // Create error object with status for retry logic
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
      }

      const candidates = Array.isArray(data?.candidates) ? data.candidates : [];
      const segments = [];
      for (const candidate of candidates) {
        for (const part of candidate?.content?.parts || []) {
          if (typeof part.text === 'string' && part.text.trim()) {
            segments.push(part.text.trim());
          }
        }
      }
      const text = segments.join('\n').trim();
      if (!text) {
        console.error('Gemini response missing text payload', data);
        const error = new Error('No text generated');
        error.status = 502;
        throw error;
      }

      // Step 5: Extract and clean title
      const title = extractTitle(text);
      
      // Get content (everything after first line)
      const lines = text.split('\n');
      lines.shift(); // Remove title line
      const content = lines.join('\n').trim() || text.trim();

      // Step 6: Validate content length
      const lengthValidation = validateContentLength(content);
      if (!lengthValidation.valid) {
        console.warn('Content length validation warning:', lengthValidation.error);
        // Log warning but continue - the AI might have generated slightly outside range
        // In a stricter implementation, you could retry with adjusted prompt
      }

      // Step 7: Add source citations to the content
      const sourceCitations = formatSourceCitations(validSources);
      const contentWithSources = content + sourceCitations;

      // Step 8: Format sources for response (without content field)
      const sourcesForResponse = validSources.map(source => ({
        title: source.title,
        url: source.url
      }));

      // Step 9: Add metadata
      const generatedAt = new Date().toISOString();
      const wordCount = lengthValidation.wordCount;

      return { 
        title, 
        content: contentWithSources, 
        sources: sourcesForResponse,
        metadata: {
          generatedAt,
          sourceCount: sourcesForResponse.length,
          wordCount
        }
      };
    }, 3, 1000); // 3 retries with 1 second base delay

    return { status: 200, body: result };
  } catch (error) {
    console.error('Gemini article generation failed:', error);
    const message = error?.message || 'Gemini request failed';
    
    // Check for rate limiting
    if (error?.status === 429 || message.toLowerCase().includes('quota') || message.toLowerCase().includes('rate limit')) {
      return createErrorResponse(
        ERROR_CODES.API_ERROR,
        'API-gränsen har nåtts. Vänta en stund och försök igen.',
        429,
        { provider: 'Gemini', originalMessage: message, status: error?.status }
      );
    }
    
    // Check if it's a network/timeout error
    if (isNetworkError(error)) {
      return createErrorResponse(
        ERROR_CODES.NETWORK_ERROR,
        'Nätverksfel eller timeout. Kontrollera din anslutning och försök igen.',
        504,
        { provider: 'Gemini', originalMessage: message }
      );
    }
    
    // Check for content generation errors
    if (error?.status === 502 || message.includes('No text generated')) {
      return createErrorResponse(
        ERROR_CODES.CONTENT_ERROR,
        'Ingen text genererades av Gemini. Försök igen.',
        502,
        { provider: 'Gemini', originalMessage: message }
      );
    }
    
    return createErrorResponse(
      ERROR_CODES.GENERATION_ERROR,
      `Gemini-generering misslyckades: ${message}`,
      502,
      { provider: 'Gemini', originalMessage: message, status: error?.status }
    );
  }
}
