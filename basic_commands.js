const { Dialog } = require('puppeteer')
const puppeteer=require('puppeteer')

async function run() {
    const browser=await puppeteer.launch({headless:false})
    const page=await browser.newPage()

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // handling dropdown
    await page.click('input[value="radio1"]')
    const isSelected=await page.$eval('input[value="radio1"]',el=>el.checked)
    console.log(`Radio button is selected :${isSelected}`)
    
    await page.select('#dropdown-class-example','option1')
    
    // await page.type('input[placeholder="Type to Select Countries"]','in')
    // await page.waitForSelector('#ul li div.ui-menu-item-wrapper')
    
    // await page.evaluate((text) => { const options = Array.from(document.querySelectorAll('#ul li div.ui-menu-item-wrapper')); 
    //     const option = options.find(option => option.innerText.includes(text)); 
    //     if (option) 
    //     { option.click(); } }, 'india')
    
    page.on('dialog',async dialog=>{
        console.log(dialog.message())
        await dialog.accept()
    })

    await page.click('#alertbtn')

    await page.click('#confirmbtn')

    await page.click('#checkBoxOption1')
    const isChecked=await page.$eval('#checkBoxOption1',el=>el.checked)
    console.log(`Checkbox is Checked :${isChecked}`)

    
    await browser.close()


}
run()