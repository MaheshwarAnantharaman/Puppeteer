const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://commitquality.com/practice-general-components');

  // Function to get text content
  const getTextContent = async (selector) => {
    const element = await page.$(selector);
    const textContent = await element.getProperty('textContent');
    return await textContent.jsonValue();
  };

  // Basic click test
  await page.click('button[data-testid="basic-click"]');
  let result = await getTextContent('div > p:nth-of-type(1)');
  console.log("Click result:", result);

  if (result === "Button clicked") {
    console.log("Basic click action performed");
  } else {
    console.log("Can't perform basic click action");
  }

  // Double click test
  await page.click('button[data-testid="double-click"]', { clickCount: 2 });
  result = await getTextContent('div > p:nth-of-type(2)');
  console.log("Double Click Result:", result);

  if (result === "Button double clicked") {
    console.log("Double click action performed");
  } else {
    console.log("Can't perform double click action");
  }

  // Right click test
  await page.click('button[data-testid="right-click"]', { button: 'right' });
  result = await getTextContent('div > p:nth-of-type(3)');
  console.log("Right Click Result:", result);

  if (result === "Button right mouse clicked") {
    console.log("Right click action performed");
  } else {
    console.log("Can't perform right click action");
  }
  
  await page.click('input[data-testid="option2"][value="option2"]')
  const isChecked=await page.$eval('input[data-testid="option2"][value="option2"]',el=>el.checked)
  console.log("Radiobutton is checked",isChecked)

  // const getTextContentForRadio = async (selector) => { 
  //   const element = await page.$(selector); 
  //   const textContent = await element.getProperty('textContent'); 
  //   return await textContent.jsonValue();
  // }

 // Select the dropdown element 
  await page.select('.dropdowns','Option 1'); 
  // Select the option by value 
 
  // Verify the selected value 
  // const selectedValue = await page.$eval('.dropdowns', el => el.textContent); 
  // console.log("Selected Option:",selectedValue)
  
  await page.click('input[data-testid="checkbox1"]')
  const isCheckedOne=await page.$eval('input[data-testid="checkbox1"]',el=>el.textContent)
  await browser.close();

})();
