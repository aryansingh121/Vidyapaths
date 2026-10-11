/**
 * logger.js
 * Environment-aware logger utility. Suppresses debug logs in production.
 */
import { env } from '../config/env';

export const logger = {
  info: (...args) => {
    if (env.IS_DEV) {
      console.info('[Vidyapaths]', ...args);
    }
  },
  warn: (...args) => {
    console.warn('[Vidyapaths Warning]', ...args);
  },
  error: (...args) => {
    console.error('[Vidyapaths Error]', ...args);
  },
  debug: (...args) => {
    if (env.IS_DEV) {
      console.debug('[Vidyapaths Debug]', ...args);
    }
  }
};

export default logger;
