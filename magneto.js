const puppeteer=require('puppeteer')
async function run(){
    const browser=await puppeteer.launch({
        headless:false
    })
    const page =await browser.newPage()
    
    await page.goto('https://magento.softwaretestingboard.com/')
    
    // await page.waitForSelector('.header .links a[href*="/customer/account/create"]')
    await page.click('.header .links a[href*="/customer/account/login"]')

    // await page.type('input[name="firstname"]','XYZ')
    // await page.type('input[name="lastname"]','ABC')
    // await page.type('input[name="email"]','abc@gmail.com')
    // await page.type('input[name="password"]','abc@1234')
    // await page.type('input[name="password_confirmation"]','abc@1234')
    // await page.click('button[title="Create an Account"]')
    
    await page.type('input[name="login[username]"]','maheshwarar06@gmail.com')
    await page.type('input[name="login[password]"]','Mahesh069$')
    await page.click('button[id="send2"]')
   
    await page.waitForSelector('h1 span[data-ui-id="page-title-wrapper"]', { visible: true }); 
    // Retrieve the text content 
    const text_Content = await page.$eval('h1 span[data-ui-id="page-title-wrapper"]', el => el.textContent); 
    console.log('TextContent:', text_Content);
    // Womens
    await page.hover('ul li a[href*="women"]')
    await page.hover('ul li a[href*="tops-women"]')
    await page.click('ul li a[href*="jackets-women"]')
    
    await page.click('a[href*="olivia-1-4-zip-light-jacket"]')
    const url=await page.url()
    console.log('URL:',url)
    expected_Url="https://magento.softwaretestingboard.com/olivia-1-4-zip-light-jacket.html"

    if(url===expected_Url){
        console.log('Url includes livia-1-4-zip-light-jacket')
    }
    else{
        console.log('Url doesn\'t includes livia-1-4-zip-light-jacket')
    }
    //  await page.select('div[aria-labelledby="option-label-size-143"]','M')
    //  await page.select('div[aria-labelledby="option-label-color-93"]','Purple')
    // await page.type('input[name="qty"]','1')
    // await page.click('button[title="Add to Cart"]')

    

    // await page.waitForSelector('div.swatch-attribute.size div.swatch-option.text.selected[option-label="L"]', { visible: true });
   
    // await page.click('div.swatch-attribute.size div.swatch-option.text.selected[option-label="L"]')

    // await page.click('div.swatch-attribute #option-label-color-93','')

    // const selectedSize=await page.$eval('div.swatch-attribute.size [option-label="L"]',el=>el.getAttribute('aria-checked'))
    // console.log("Selected Size:",selectedSize===true)

    // await page.click('.option-label-size-143-item-170',{visible:true})

    // await page.click('option-label-color-93-item-57')

    // await page.waitForSelector('input[name="qty"]')

    // await page.clear()

    // await page.type('2')

    // await page.click('button[title="Add to Cart"]')
    
    // const sizeOptions = await page.evaluate('div.swatch-attribute.size div.swatch-option', options => options.map(option => option.getAttribute('option-label'))); 
    // console.log('Available size options:',sizeOptions)

    // await page.click('div.swatch-attribute.size div.swatch-option[option-label="L"]')\

    const size=["XS","S","M","L","XL"]
    const sizeToSelect=Math.floor(Math.random()*size.length)
    const selectSize=size[sizeToSelect]
    await page.click(`div[option-label='${selectSize}']`)

    const color=["Black","Blue","Purple"]
    const colorToSelect=Math.floor(Math.random()*color.length)
    const selectColor=color[colorToSelect]
    await page.click(`div[option-label='${selectColor}']`)

    
    await browser.close()
} 

run()
