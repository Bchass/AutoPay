//=======================================================================================
// This script will log you into PayPal and send a desired amount
// to the specified person
// Author: Brandon Chasser
// Notes:
// - Install puppeteer or puppeteer extra through npm (must have npm installed)
// - One touch can also be ignored as the script will automatically bypass it
// - Optional:
//  - Install dotenv to use environment variables (examples without dotenv still present)
//  - Add .env file to the root directory of the script
//=======================================================================================

// Cookie that holds pre-filled email
const cookie = {
  name: "login_email",
  value: "testemail@org.com",
  domain: ".paypal.com",
  url: "https://www.paypal.com",
  path: "/",
  httpOnly: true,
  secure: true
};
// puppeteer extra to hide from websites when headless mode is being used
// Regular puppeteer can be used too
const puppeteer = require("puppeteer-extra");
const pluginStealth = require("puppeteer-extra-plugin-stealth");
// Load in dotenv
require('dotenv').config();
puppeteer.use(pluginStealth());
(async () => {
  // Turn headless to true or false depending on your needs
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 150
  });
  const page = await browser.newPage();

  // Load the cookie
  await page.setCookie(cookie);

  // Login page
  await page.goto("https://www.paypal.com/us/signin");
  await page.type("#password", process.env.password);
  //await page.type("#password", "test1234");

  // Click login
  await page.click("#btnLogin");

  // try/catch statement for security
  try {
    await page.click('button[data-nemo="entrySubmit');
  } catch (e) {}

  //await page.goto("https://www.paypal.com/myaccount/transfer/homepage/external/summary?recipient=testemail@org.com&firstName=test1234&lastName=test1234&displayName=test%1234&thumbnailUrl=(stuff goes here)&transaction_type=PERSONAL&from=SUM-QuickSend");
  await page.goto(process.env.link);

  // Types in the desired amount
  await page.waitForSelector("#fn-amount");
  await page.type("#fn-amount", process.env.amount);
  //await page.type("#fn-amount", "0.01");

  // Next few clicks run through the process and send the payment
  await page.click('button[data-nemo="continue"]');

  // Set tabindex to your prefered payment type. 0 being the first option, -1 being the second option, etc.
  await page.waitFor(10000);
  await page.click('input[tabindex="0"]');

  await page.click('button[data-nemo="choice-next-button"]');

  await page.click('button[data-nemo="send"]');

  // Script is closed after payment is sent
  browser.close();
})();