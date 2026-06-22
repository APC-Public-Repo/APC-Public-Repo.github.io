/**
 * metrics-provider.js
 * Pluggable provider abstraction for citation metrics.
 *
 * Providers tried in order: dimensions → manual
 * Google Scholar has no public API and prohibits scraping; add a legal
 * proxy/SerpAPI adapter here if you acquire credentials (see DIMENSIONS_KEY note).
 *
 * ENV vars:
 *   DIMENSIONS_KEY   — Dimensions Analytics API key (optional)
 *   MANUAL_METRICS   — Absolute path to manual-metrics.json (default: project root)
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

// ── Dimensions Analytics API ──────────────────────────────────────────────────

const DIM_ENDPOINT = 'https://metrics-api.dimensions.ai/api/data/publications';

/**
 * Batch-fetch citation counts from Dimensions.
 * @param {Array<{title:string, year:string}>} papers
 * @returns {Promise<Map<string,{dimensions:number, dimensionsUrl:string}>>}
 */
async function fetchDimensions(papers) {
    const key = process.env.DIMENSIONS_KEY;
    if (!key) return new Map();

    const results = new Map();
    const CHUNK = 20;

    for (let i = 0; i < papers.length; i += CHUNK) {
        const chunk = papers.slice(i, i + CHUNK);
        const dsl = chunk.map(p => {
            const t = (p.title || '').replace(/"/g, '').slice(0, 120);
            return `title:"${t}"`;
        }).join(' OR ');

        const query = {
            search_query: `search publications for ${dsl}`,
            search_filters: { year_range: { min_year: 1990 } },
            fields: ['title', 'year', 'times_cited', 'id'],
            limit: chunk.length * 2
        };

        try {
            const raw = await httpPost(DIM_ENDPOINT, query, {
                'Content-Type': 'application/json',
                'Authorization': `ApiKey ${key}`
            });
            const data = JSON.parse(raw);
            (data.publications || []).forEach(pub => {
                const normTitle = (pub.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                chunk.forEach(p => {
                    const pt = (p.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (normTitle.length > 10 && pt.indexOf(normTitle.slice(0, 40)) !== -1) {
                        results.set(p.key, {
                            dimensions: pub.times_cited || 0,
                            dimensionsUrl: `https://app.dimensions.ai/details/publication/${pub.id}`
                        });
                    }
                });
            });
        } catch (_) {
            // provider error — skip chunk, continue
        }
    }
    return results;
}

// ── Manual JSON fallback ──────────────────────────────────────────────────────

let _manualCache = null;

function loadManual() {
    if (_manualCache) return _manualCache;
    const filePath = process.env.MANUAL_METRICS
        || path.resolve(process.cwd(), 'manual-metrics.json');
    try {
        _manualCache = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (_) {
        _manualCache = { metrics: {} };
    }
    return _manualCache;
}

/**
 * Resolve metrics for a set of paper keys from manual-metrics.json.
 * @param {string[]} keys
 * @returns {Map<string, object>}
 */
function fromManual(keys) {
    const manual = loadManual();
    const map    = manual.metrics || manual;
    const out    = new Map();
    keys.forEach(k => { if (map[k]) out.set(k, map[k]); });
    return out;
}

// ── Orchestration ─────────────────────────────────────────────────────────────

/**
 * Resolve citation metrics for an array of paper descriptors.
 * Returns a plain object { [key]: {googleScholar, googleScholarUrl, dimensions, dimensionsUrl} }.
 *
 * @param {Array<{key:string, title:string, year:string, firstAuthor:string}>} papers
 * @returns {Promise<object>}
 */
async function resolve(papers) {
    const out = {};

    // Manual data as baseline
    const manualKeys = papers.map(p => p.key);
    const manual     = fromManual(manualKeys);
    manual.forEach((v, k) => { out[k] = Object.assign({}, v); });

    // Overlay Dimensions data (if API key present)
    const dimResults = await fetchDimensions(papers).catch(() => new Map());
    dimResults.forEach((v, k) => {
        out[k] = Object.assign(out[k] || {}, v);
    });

    return out;
}

// ── Tiny HTTP helper ──────────────────────────────────────────────────────────

function httpPost(url, body, headers) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify(body);
        const u       = new URL(url);
        const opts    = {
            hostname: u.hostname,
            path:     u.pathname + u.search,
            method:   'POST',
            headers:  Object.assign({ 'Content-Length': Buffer.byteLength(payload) }, headers),
            timeout:  10000
        };
        const req = https.request(opts, res => {
            let data = '';
            res.on('data', c => (data += c));
            res.on('end', () => (res.statusCode >= 200 && res.statusCode < 300) ? resolve(data) : reject(new Error(res.statusCode)));
        });
        req.on('error',   reject);
        req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
        req.write(payload);
        req.end();
    });
}

module.exports = { resolve };
