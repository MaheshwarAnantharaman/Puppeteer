const puppeteer=require('puppeteer')

async function run() {
     const browser=await puppeteer.launch()
     const page=await browser.newPage()

     await page.goto('https://www.amazon.in/')

     const title=await page.evaluate( (el)=>el.document.querySelector(' a > div.a-section.a-spacing-none._fluid-quad-image-label-v2_style_imageLabel__3ANSV.aok-inline-block.aok-align-center > span').textContent())
     console.log("Title:",title)
}
run()