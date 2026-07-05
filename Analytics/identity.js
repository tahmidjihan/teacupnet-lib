import { initial } from '../index.js';

const FINGERPRINT_KEY_BASE = 'teacup_fingerprint';

/**
 * Per-client localStorage key. Namespacing by clientID means a visitor who uses
 * the same browser across two different Teacup customer sites gets a distinct id
 * per site, so their identifiers can never collide in the shared analytics table.
 * @returns {string}
 */
function storageKey() {
  return initial.clientID
    ? `${FINGERPRINT_KEY_BASE}_${initial.clientID}`
    : FINGERPRINT_KEY_BASE;
}

/**
 * Generate a random, collision-resistant visitor id.
 * @returns {string}
 */
function generateId() {
  // Prefer a real UUID when the runtime provides one.
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return 'fp_' + crypto.randomUUID();
  }
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    let hex = '';
    for (let i = 0; i < bytes.length; i++) {
      hex += bytes[i].toString(16).padStart(2, '0');
    }
    return 'fp_' + hex;
  }
  // Last-resort fallback.
  return (
    'fp_' +
    Math.random().toString(36).substring(2, 18) +
    Date.now().toString(36)
  );
}

/**
 * Return a stable, per-visitor identifier.
 *
 * IMPORTANT: this must be UNIQUE per visitor. The previous implementation used
 * `canvas.toDataURL().slice(-32)`, which produces an IDENTICAL value for every
 * visitor on the same browser/GPU/font stack — collapsing all visitors into a
 * single analytics record. We now use a random id persisted in localStorage.
 *
 * @returns {string} Visitor fingerprint
 */
export default function fingerprint() {
  const key = storageKey();
  try {
    const existing = localStorage.getItem(key);
    if (existing) {
      return existing;
    }
    const id = generateId();
    localStorage.setItem(key, id);
    return id;
  } catch (error) {
    // localStorage unavailable (private mode / SSR) — return a volatile id so
    // tracking still functions for the current page view.
    console.warn('Fingerprint persistence unavailable, using volatile id:', error);
    return generateId();
  }
}
