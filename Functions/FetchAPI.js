import { initial } from '../index.js';

/**
 * Default production API base URL for the Teacup client API.
 * Override at runtime by passing `{ apiUrl }` to `init()` (sets window.TEACUP_API_URL).
 */
const DEFAULT_API_BASE_URL = 'https://backend.teacup.website';

const API_BASE_URL = typeof window !== 'undefined' && window.TEACUP_API_URL
  ? window.TEACUP_API_URL
  : DEFAULT_API_BASE_URL;

/**
 * Fetch wrapper for Teacup API calls
 * @param {string} path - API path (e.g., 'api/client/blogs')
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} method - HTTP method
 * @param {Object|null} body - Request body
 * @returns {Promise<any>} Response data
 */
export default async function fetchAPI(path, method = 'GET', body = null) {
  const req = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      // Send the client credentials on every request so authenticated GETs
      // (blogs, inbox metadata) work — not just POSTs that carry `initial` in
      // the body. The client key is a public, per-site key by design.
      'x-client-id': initial.clientID,
      'x-client-key': initial.clientKey,
    },
  };

  // Add body for non-GET requests
  if (method !== 'GET' && body !== null) {
    req.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${path}`, req);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('[Teacup API Error]', {
      path,
      method,
      error: error.message,
    });
    return {
      error: 'Request failed',
      message: error.message,
    };
  }
}
