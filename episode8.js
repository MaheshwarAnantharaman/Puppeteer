const pupeteer=require('puppeteer')

async function run(url,outputPath) {
    try{
        const browser=await pupeteer.launch({
            headless:false,
        })
        const page=await browser.newPage()
        await page.goto(url)

        await page.screenshot({
            path:outputPath
        })

        await  browser.close()
    }
    catch(err){
        console.log(err)
    }
}
run("https://google.com","google.png")