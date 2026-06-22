/**
 * api/publication-metrics.js
 * Vercel serverless endpoint: POST /api/publication-metrics
 *
 * Request body:
 *   { papers: [{key, title, year, firstAuthor}] }
 *
 * Response:
 *   { metrics: { [key]: {googleScholar?, googleScholarUrl?, dimensions?, dimensionsUrl?} } }
 */

'use strict';

const cache    = require('./_lib/metrics-cache');
const provider = require('./_lib/metrics-provider');

const BATCH_MAX = 100;

module.exports = async function handler(req, res) {
    // CORS — allow same-origin + apcresearch.org family
    const origin = req.headers.origin || '';
    const allowedOrigin = /apcresearch\.org$/.test(origin) ? origin : '';
    if (allowedOrigin) res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

    let body;
    try {
        body = typeof req.body === 'object' ? req.body : JSON.parse(req.body);
    } catch (_) {
        return res.status(400).json({ error: 'Invalid JSON' });
    }

    const papers = (body.papers || []).slice(0, BATCH_MAX);
    if (!papers.length) return res.status(200).json({ metrics: {} });

    // Split into cached / uncached
    const metrics    = {};
    const uncached   = [];

    papers.forEach(p => {
        if (!p.key) return;
        const hit = cache.get(p.key);
        if (hit !== null) { metrics[p.key] = hit; }
        else              { uncached.push(p); }
    });

    // Resolve uncached papers via provider
    if (uncached.length) {
        let resolved = {};
        try {
            resolved = await Promise.race([
                provider.resolve(uncached),
                new Promise((_, rej) => setTimeout(() => rej(new Error('provider-timeout')), 12000))
            ]);
        } catch (_) {
            // provider failed — return whatever cache hits we have
        }
        uncached.forEach(p => {
            const m = resolved[p.key] || null;
            cache.set(p.key, m);
            if (m) metrics[p.key] = m;
        });
    }

    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({ metrics });
};
