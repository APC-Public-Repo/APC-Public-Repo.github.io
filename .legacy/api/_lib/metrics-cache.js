/**
 * metrics-cache.js
 * In-memory TTL cache for citation metrics.
 * NOTE: Vercel serverless instances are ephemeral — this cache is per-instance.
 * For cross-invocation persistence, swap `store` for Redis/Vercel KV.
 */

'use strict';

const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const store = new Map();

/**
 * @param {string} key
 * @returns {object|null}
 */
function get(key) {
    const entry = store.get(key);
    if (!entry) return null;
    if (Date.now() - entry.ts > TTL_MS) { store.delete(key); return null; }
    return entry.value;
}

/**
 * @param {string} key
 * @param {object} value
 */
function set(key, value) {
    store.set(key, { value, ts: Date.now() });
}

/** Returns current cache size (for debug/health). */
function size() { return store.size; }

module.exports = { get, set, size, TTL_MS };
