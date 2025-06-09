function generateReport(url, headers, iframeResult, score, riskLevel) {
  const recommendations = [];
  if (headers.xFrameOptions === 'MISSING')
    recommendations.push('Add X-Frame-Options header (DENY or SAMEORIGIN).');
  if (headers.cspFrameAncestors === 'MISSING')
    recommendations.push('Implement CSP with frame-ancestors directive.');
  if (iframeResult === 'EMBEDDABLE')
    recommendations.push('Fix headers to prevent iframe embedding.');
  return {
    scanDate: new Date().toISOString(),
    targetUrl: url,
    securityHeaders: {
      xFrameOptions: headers.xFrameOptions,
      cspFrameAncestors: headers.cspFrameAncestors
    },
    iframeTest: iframeResult,
    riskScore: score,
    riskLevel: riskLevel,
    recommendations
  };
}
function printHumanReport(report) {
  console.log(`\nScan Report for: ${report.targetUrl}`);
  console.log(`Date: ${report.scanDate}`);
  console.log(`X-Frame-Options: ${report.securityHeaders.xFrameOptions}`);
  console.log(`CSP frame-ancestors: ${report.securityHeaders.cspFrameAncestors}`);
  console.log(`Iframe Embedding Test: ${report.iframeTest}`);
  console.log(`Risk Score: ${report.riskScore} (${report.riskLevel})`);
  if (report.recommendations.length) {
    console.log('Recommendations:');
    report.recommendations.forEach(r => console.log(`  - ${r}`));
  }
  console.log('');
}
module.exports = { generateReport, printHumanReport };
