function calculateRisk(headers, iframeResult) {
    let score = 0;
    if (headers.xFrameOptions === 'DENY') score += 7;
    else if (headers.xFrameOptions === 'SAMEORIGIN') score += 5;
    else if (headers.xFrameOptions === 'MISSING') score += 0;
    else score += 2;
    if (headers.cspFrameAncestors !== 'MISSING') {
        if (/none/.test(headers.cspFrameAncestors)) score += 7;
        else score += 5;
    }
    if (iframeResult === 'EMBEDDABLE') score -= 5;
    else if (iframeResult === 'BLOCKED') score += 3;
    let level = 'High Risk';
    if (score >= 12) level = 'Low Risk';
    else if (score >= 7) level = 'Medium Risk';
    return { score, level };
}
module.exports = { calculateRisk };
