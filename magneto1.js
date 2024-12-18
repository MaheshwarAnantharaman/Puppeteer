const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    await page.goto('https://magento.softwaretestingboard.com/');

    await page.click('.header .links a[href*="/customer/account/login"]');

    await page.type('input[name="login[username]"]', 'maheshwarar06@gmail.com');
    await page.type('input[name="login[password]"]', 'Mahesh069$');
    await page.click('button[id="send2"]');

    await page.waitForSelector('h1 span[data-ui-id="page-title-wrapper"]', { visible: true });
    const text_Content = await page.$eval('h1 span[data-ui-id="page-title-wrapper"]', el => el.textContent);
    console.log('TextContent:', text_Content);

    await page.hover('ul li a[href*="women"]');
    await page.hover('ul li a[href*="tops-women"]');
    await page.click('ul li a[href*="jackets-women"]');

    await page.click('a[href*="olivia-1-4-zip-light-jacket"]');
    const url = await page.url();
    console.log('URL:', url);
    const expected_Url = "https://magento.softwaretestingboard.com/olivia-1-4-zip-light-jacket.html";

    if (url === expected_Url) {
        console.log('Url includes livia-1-4-zip-light-jacket');
    } else {
        console.log('Url doesn\'t includes livia-1-4-zip-light-jacket');
    }
    
    await page.waitForSelector('[aria-labelledby="option-label-size-143"] div')
    
    const sizeOptions = await page.$$('[aria-labelledby="option-label-size-143"] div'); 
    const sizesArray =[]

    for (const option of sizeOptions) 
        { const sizeText = await page.evaluate(el => el.textContent, option);
            sizesArray.push(sizeText.trim()); 
        }
        console.log('Size options:', sizesArray);


     const sizeToSelect = Math.floor(Math.random() * sizesArray.length);
     const selectSize = sizesArray[sizeToSelect];
     console.log(selectSize)

    await page.waitForSelector('div[aria-labelledby="option-label-color-93"] div')

    const colorOptions=await page.$$('div[aria-labelledby="option-label-color-93"] div')
    const colors=[]

    for (const option of colorOptions ){
        const colorLabel=await page.evaluate(el=>el.getAttribute('aria-label'),option)
        colors.push(colorLabel.trim())
    }

    console.log('Colors:',colors)
    const colorToSelect = Math.floor(Math.random() * colors.length);
    const selectColor = colors[colorToSelect];
    console.log(selectColor)

    
    await page.waitForSelector(`[option-label='${selectSize}']`)
    await page.click(`[option-label='${selectSize}']`);

    await page.waitForSelector(`[option-label='${selectColor}']`)
    await page.click(`[option-label='${selectColor}']`);
    
    const qty=Math.floor(Math.random()*10)
    console.log("Quantity added:",qty)

    const selectQty = await page.waitForSelector('[title="Qty"]', { visible: true });

    await selectQty.click({ clickCount: 3 }); // Triple click to select all text 
    await selectQty.type(qty.toString())
    
    await page.click('button[title="Add to Cart"]')

    await page .click('.action.showcart')

    const viewCartButtonExists = await page.$('.action.viewcart span'); 
        if (!viewCartButtonExists) 
        { 
            console.error('"View and Edit Cart" button not found'); 

        } 
        else 
        { 
            console.log('"View and Edit Cart" button found');
         await page.click('.action.viewcart span')
        }

    await page.waitForSelector('#shopping-cart-table tr', { visible: true }); 

    const price=await page.$eval('#shopping-cart-table tr td:nth-child(2)', el=>el.textContent.trim())
    console.log(price)
    await browser.close();
    
}

run();