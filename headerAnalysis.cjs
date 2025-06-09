const axios = require('axios');

async function analyzeHeaders(url) {
    if (!/^https?:\/\//.test(url)) url = 'https://' + url;
    try {
        const response = await axios.get(url, { timeout: 15000 });
        const headers = response.headers;
        let xFrame = headers['x-frame-options'] ? headers['x-frame-options'].toUpperCase() : 'MISSING';
        let csp = headers['content-security-policy'] || '';
        let frameAncestors = 'MISSING';
        if (/frame-ancestors/i.test(csp)) {
            const match = csp.match(/frame-ancestors[^;]*/i);
            frameAncestors = match ? match[0].trim() : 'MISSING';
        }
        return {
            xFrameOptions: xFrame,
            cspFrameAncestors: frameAncestors,
            status: 'SUCCESS'
        };
    } catch (err) {
        return { error: err.message, status: 'FAILED' };
    }
}
module.exports = { analyzeHeaders };
