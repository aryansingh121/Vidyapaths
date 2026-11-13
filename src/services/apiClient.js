/**
 * apiClient.js
 * Robust HTTP client with abort timeout, structured error handling,
 * and predictable response wrappers for client-side API requests.
 */
import { env } from '../config/env.js';

export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Formats user-friendly, specific error messages based on HTTP status,
 * network state, and backend error payloads.
 */
export function formatApiErrorMessage(err, status = 0, data = null) {
  // If client browser is explicitly offline
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'You appear to be offline. Please verify your internet connection and try again.';
  }

  // Request timeout / AbortError
  if (err?.name === 'AbortError' || status === 408 || status === 504) {
    return 'The enquiry server took too long to respond. Our mentors may be reviewing a high volume of requests — please try again in a few moments, or connect directly on WhatsApp.';
  }

  // HTTP 400: Bad Request / Validation Failure
  if (status === 400) {
    if (data?.error) return data.error;
    if (data?.message) return data.message;
    return 'Some of the submitted information is incomplete or invalid. Please check your entries and try again.';
  }

  // HTTP 401 / 403: Authorization / Access Restriction
  if (status === 401 || status === 403) {
    return 'Submission authorization could not be confirmed. Please refresh the page and try again.';
  }

  // HTTP 404: Endpoint Not Found
  if (status === 404) {
    return 'The enquiry submission service is temporarily unavailable. Please reach out to our team directly on WhatsApp (+91 8252332061).';
  }

  // HTTP 429: Rate Limit Exceeded
  if (status === 429) {
    if (data?.error) return data.error;
    return 'Too many enquiry requests received from your connection. Please wait a minute before trying again.';
  }

  // HTTP 502: Bad Gateway / Upstream Mail Failure
  if (status === 502) {
    if (data?.error) return data.error;
    return 'Email delivery service is momentarily delayed. Your details are saved locally — please contact us directly on WhatsApp.';
  }

  // HTTP 500 / 503: Internal Server Error
  if (status >= 500) {
    if (data?.error) return data.error;
    return 'Our server experienced a temporary issue while recording your enquiry. Please try again shortly or connect with us via WhatsApp.';
  }

  // Network connection failure (e.g. ad-blocker, DNS glitch, browser connection abort)
  if (err && (err.message === 'Failed to fetch' || err.name === 'TypeError')) {
    return 'Unable to establish a secure connection to the enquiry server. Please check your connection or reach out on WhatsApp.';
  }

  return (
    data?.error ||
    data?.message ||
    err?.message ||
    'An unexpected error occurred while submitting your enquiry. Please try again.'
  );
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
      const formattedMessage = formatApiErrorMessage(null, response.status, parsedData);
      throw new ApiError(formattedMessage, response.status, parsedData);
    }

    return {
      success: true,
      data: parsedData,
      status: response.status
    };
  } catch (err) {
    clearTimeout(timeoutId);

    const status = err.status || (err.name === 'AbortError' ? 408 : 0);
    const friendlyError = formatApiErrorMessage(err, status, err.data);

    return {
      success: false,
      error: friendlyError,
      status,
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
