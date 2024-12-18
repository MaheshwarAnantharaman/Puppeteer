const pupeteer=require('puppeteer')
const fs=require('fs')

async function getSourceCode(url,outputPath) {
    try{
       const browser=pupeteer.launch({
        
       })
       const page=await browser.newPage()

       await page.goto(url)

       const sourceCode=await page.content();

       fs.writeFileSync(outputPath,sourceCode,"utf-8")

       await browser.close()
       console.log("extracted the source code of the url Successfully! ")
    }
    catch(err){
     console.log("error in getting source code of the url")
    }
}
getSourceCode("https://example.com/","source-code.html")