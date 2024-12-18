const puppeteer = require('puppeteer');

async function generatePDF(url, outputFile) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        await page.pdf({
            path: outputFile,
            format: 'A4'
        });

        await browser.close();
    } catch (err) {
        console.log(err);
    }
}

generatePDF("https://google.com", "episode7.pdf");
