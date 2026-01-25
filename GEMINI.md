# Project Overview

This is a web project called "Private Lives Matter" (PLM). It is built with Node.js and deployed on Cloudflare Pages. The project uses Cloudflare Workers for backend functions and integrates with both Google Gemini and OpenAI APIs.

The project is structured as a monorepo and contains two main parts:

1.  **Main Application:** The root directory contains the main application. It's a static site with a set of serverless functions in the `functions/api` directory. These functions provide an API for:
    *   Generating news articles (`news-generate.js`)
    *   Generating images (`image-generate.js`)
    *   Subscribing to a newsletter (`subscribe.js`)
    *   Performing web searches (`web-search.js`)

2.  **BalkanBeats Application:** The `BalkanBeats/` directory contains a separate React application built with Vite. This application is a tool that provides:
    *   A translator
    *   A "Festival Guide" or "Festival Lesson"

# Building and Running

## Main Application

*   **Development:** `npm run dev`
    *   This command starts a local development server for the Cloudflare Pages application using `wrangler`.
*   **Deployment:** `npm run deploy`
    *   This command deplodes the application to Cloudflare Pages.
*   **Testing:** `npm test`
    *   This command runs the tests for the serverless functions.

## BalkanBeats Application

*   **Development:** `cd BalkanBeats && npm run dev`
*   **Building:** `cd BalkanBeats && npm run build`

# Development Conventions

*   The project uses JavaScript and TypeScript.
*   The main application uses serverless functions for the backend, deployed on Cloudflare Workers.
*   The `BalkanBeats` application is a modern React application built with Vite.
*   The project uses both Google Gemini and OpenAI APIs. API keys are required in the environment variables.
*   The backend code includes a retry mechanism with exponential backoff for API calls to improve robustness.
