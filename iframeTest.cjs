const puppeteer = require('puppeteer');

async function testIframeEmbedding(url) {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
        const page = await browser.newPage();
        const html = `<iframe id="testframe" src="${url}" width="800" height="600"></iframe>`;
        await page.setContent(html, { waitUntil: 'domcontentloaded' });
        const iframeElement = await page.waitForSelector('#testframe', { timeout: 5000 });
        if (!iframeElement) return 'BLOCKED';
        const frame = await iframeElement.contentFrame();
        if (!frame) return 'BLOCKED';
        try {
            await frame.waitForSelector('body', { timeout: 3000 });
            return 'EMBEDDABLE';
        } catch {
            return 'BLOCKED';
        }
    } catch (err) {
        return `ERROR: ${err.message}`;
    } finally {
        if (browser) await browser.close();
    }
}
module.exports = { testIframeEmbedding };
