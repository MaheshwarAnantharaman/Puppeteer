const pupeteer=require('puppeteer')

async function captureAndGeneratePDF(url,outputPath){
    try{
        const browser=await pupeteer.launch({
            headless:false
        })

        const page=await browser.newPage()

        await page.goto(url)

        await page.screenshot({path:'epsiode9.jpg'})

        await page.pdf({
            path:outputPath,format:'A4'
        })
        await browser.close
        console.log("PDF and screenshot genearted succesfully")

    }
    catch(err){
        console.log("Unable to generate PDF and screenshot")
    }
}

captureAndGeneratePDF("https://google.com","episode9.pdf")