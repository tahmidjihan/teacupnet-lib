import { initial } from '../index.js';

/**
 * Base API URL - can be overridden via configuration
 */
const API_BASE_URL = typeof window !== 'undefined' && window.TEACUP_API_URL
  ? window.TEACUP_API_URL
  : 'http://localhost:8001';

/**
 * Fetch wrapper for Teacup API calls
 * @param {string} path - API path (e.g., 'api/blogs')
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} method - HTTP method
 * @param {Object|null} body - Request body
 * @returns {Promise<any>} Response data
 */
export default async function fetchAPI(path, method = 'GET', body = null) {
  const req = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
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
