/**
 * apiClient.js
 * Robust HTTP client with abort timeout, structured error handling,
 * and predictable response wrappers for client-side API requests.
 */
import { env } from '../config/env';

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Standard fetch wrapper with timeout and standardized responses.
 * @param {string} endpoint - API endpoint or full URL
 * @param {RequestInit} [options={}] - Fetch configuration options
 * @param {number} [timeoutMs=15000] - Request timeout in milliseconds
 * @returns {Promise<{ success: boolean, data?: any, error?: string, status: number }>}
 */
export async function request(endpoint, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const url = endpoint.startsWith('http') ? endpoint : `${env.API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Accept': 'application/json'
  };

  if (options.body && typeof options.body === 'string') {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const mergedConfig = {
    ...options,
    signal: controller.signal,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, mergedConfig);
    clearTimeout(timeoutId);

    let parsedData = null;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      parsedData = await response.json();
    } else {
      parsedData = await response.text();
    }

    if (!response.ok) {
      const errorMessage = (parsedData && parsedData.message) || 
        `Request failed with status ${response.status}: ${response.statusText}`;
      throw new ApiError(errorMessage, response.status, parsedData);
    }

    return {
      success: true,
      data: parsedData,
      status: response.status
    };
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'Network request timed out. Please check your internet connection and try again.',
        status: 408
      };
    }

    return {
      success: false,
      error: err.message || 'An unexpected network error occurred.',
      status: err.status || 0,
      data: err.data || null
    };
  }
}

export const apiClient = {
  get: (url, options, timeout) => request(url, { ...options, method: 'GET' }, timeout),
  post: (url, data, options, timeout) =>
    request(
      url,
      {
        ...options,
        method: 'POST',
        body: typeof data === 'string' ? data : JSON.stringify(data)
      },
      timeout
    )
};

export default apiClient;
