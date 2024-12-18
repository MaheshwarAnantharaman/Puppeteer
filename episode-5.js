const puppeteer = require('puppeteer');
const fs=require('fs')

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://google.com');
    
    // Extract images
    const images = await page.$$eval('img', elements =>
        elements.map(element => ({
            src: element.src,
            alt: element.alt,
            
        }))
    );
    
    // Extract links
    const links = await page.$$eval('a', elements =>
        elements.map(element => ({
            href: element.href,
            text: element.textContent.trim(),
        }))
    );

    const imgCount = images.length;
    const linkCount = links.length;

    // Combine images, links, and their counts into a single object
    const output = {
        images,
        links,
        imgCount,
        linkCount,
    };
     
    const outputFile=JSON.stringify(output, null, 2)
    console.log(outputFile); // Pretty-print the JSON output
    fs.writeFileSync("episode6.json",outputFile)
    await browser.close();
}

run();
