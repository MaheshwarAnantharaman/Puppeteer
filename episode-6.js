const pupeteer=require('puppeteer')
const fs=require('fs')

async function run() {
    
    const browser=await pupeteer.launch({
        headless:false
    })
    const page=await browser.newPage()
    await page.goto('https://yahoo.com');

    //extract SEO related data
    const title=await page.title()
    const metaDesc=await page.$eval('meta[name="description"]',(elements)=>elements.textContent)
    const metaKeywords=await page.$eval('meta[name="keywords"]',(elements)=>elements.textContent)

    const link=page.$$eval('a',(elements)=>
        elements.map((element)=>({
          src:element.href,
          text:element.textContent
        })
    ))

    const images=page.$$eval('img',(elements)=>
            elements.map((element)=>({
              src:element.src,
              alt:element.alt
        })
    ))    

            const imageCount=images.length;
            const linkCount=link.length;

            const output={
                title,
                metaDesc,
                metaKeywords,
                images,
                link,
                imageCount,
                linkCount
            }

            const outputJSON=JSON.stringify(output,null,2)
            fs.writeFileSync("output.json",outputJSON)


            await browser.close()
}
run()