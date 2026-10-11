/**
 * storageService.js
 * Safe LocalStorage and SessionStorage abstraction.
 * Defends against browser tracking prevention, quota exceptions, and SSR environments.
 */

class SafeStorage {
  constructor(storageType = 'localStorage') {
    this.storageType = storageType;
    this.memoryFallback = new Map();
  }

  get isAvailable() {
    try {
      if (typeof window === 'undefined') return false;
      const testKey = '__vidyapaths_storage_test__';
      window[this.storageType].setItem(testKey, testKey);
      window[this.storageType].removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key, defaultValue = null) {
    try {
      if (this.isAvailable) {
        const item = window[this.storageType].getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      }
      return this.memoryFallback.has(key) ? this.memoryFallback.get(key) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  setItem(key, value) {
    try {
      const serialized = JSON.stringify(value);
      if (this.isAvailable) {
        window[this.storageType].setItem(key, serialized);
      } else {
        this.memoryFallback.set(key, value);
      }
      return true;
    } catch (err) {
      console.warn(`[SafeStorage] Failed to persist key "${key}":`, err);
      this.memoryFallback.set(key, value);
      return false;
    }
  }

  removeItem(key) {
    try {
      if (this.isAvailable) {
        window[this.storageType].removeItem(key);
      }
      this.memoryFallback.delete(key);
      return true;
    } catch {
      return false;
    }
  }

  clear() {
    try {
      if (this.isAvailable) {
        window[this.storageType].clear();
      }
      this.memoryFallback.clear();
      return true;
    } catch {
      return false;
    }
  }
}

export const safeLocalStorage = new SafeStorage('localStorage');
export const safeSessionStorage = new SafeStorage('sessionStorage');

export default safeLocalStorage;
