const puppeteer=require('puppeteer')

async function run(){
//    Launch browser
    const browser=await puppeteer.launch(
        {
            headless:false,
            devtools:true,
            defaultViewport:{width:1440,height:600},
            slowMo:1000,
            
         });

    const page =await browser.newPage()

    await page.goto("https://www.yahoo.com/")

    const title=await page.title()
    console.log(title)

    const heading=await page.$eval('h1',(el=>el.textContent))
    console.log(heading)

    await page.screenshot({path:'screenshot.png'})

    await page.pdf({path:'example.pdf',format:'A4'})

    await browser.close()
}

run()