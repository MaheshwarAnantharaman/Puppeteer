const puppeteer = require('puppeteer');

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  const inputSelector = 'input[placeholder="Type to Select Countries"]';

  // Type the first few letters to filter the dropdown options
  await page.type(inputSelector, 'In');

  // Wait for the dropdown options to be populated
  const optionSelector = 'ul li div.ui-menu-item-wrapper';
  await page.waitForSelector(optionSelector);

  // Select the option that matches the desired text
  await page.evaluate((text) => {
    const options = Array.from(document.querySelectorAll('ul li div.ui-menu-item-wrapper'));
    const option = options.find(option => option.innerText.includes(text));
    if (option) {
      option.click();
    }
  }, 'India');

  console.log('Option selected successfully');

  await browser.close();
}

run();
