const { analyzeHeaders } = require('./headerAnalysis.cjs');
const { testIframeEmbedding } = require('./iframeTest.cjs');
const { calculateRisk } = require('./riskScore.cjs');
const { generateReport, printHumanReport } = require('./report.cjs');
const fs = require('fs');

async function processUrl(url, outputFormat) {
    const headers = await analyzeHeaders(url);
    if (headers.status !== 'SUCCESS') {
        console.error(`Failed to scan ${url}: ${headers.error}`);
        return;
    }
    const iframeResult = await testIframeEmbedding(url);
    const { score, level } = calculateRisk(headers, iframeResult);
    const report = generateReport(url, headers, iframeResult, score, level);
    if (outputFormat === 'json') {
        console.log(JSON.stringify(report, null, 2));
    } else {
        printHumanReport(report);
    }
}

async function main() {
    const args = process.argv.slice(2);
    let url = null, batchFile = null, outputFormat = 'human';
    for (let i = 0; i < args.length; i++) {
        if (args[i] === '-o' || args[i] === '--output') {
            outputFormat = args[i + 1];
            i++;
        } else if (args[i] === '-b' || args[i] === '--batch') {
            batchFile = args[i + 1];
            i++;
        } else if (!url) {
            url = args[i];
        }
    }
    if (batchFile) {
        const urls = fs.readFileSync(batchFile, 'utf-8').split('\n').filter(Boolean);
        for (const u of urls) {
            await processUrl(u, outputFormat);
        }
    } else if (url) {
        await processUrl(url, outputFormat);
    } else {
        console.log('Usage: node scanner.cjs <url> [-o json|human] [-b batchfile]');
    }
}
main();
