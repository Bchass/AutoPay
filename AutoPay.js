import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import dotenv from 'dotenv'
import {cookie} from './cookie.js'

dotenv.config()

puppeteer
  .use(StealthPlugin())
  .use(AdblockerPlugin())
  .launch({headless: false, slowMo:150, blockTrackers: true})
  .then(async browser => {
    const page = await browser.newPage()
    await page.setCookie(cookie)
    await page.goto("https://www.paypal.com/us/signin");

    await page.type("#password", process.env.password);
    await page.click("#btnLogin");

    try {
      await page.click('button[data-nemo="entrySubm');
    } catch(e){}

    await page.goto(process.env.link);
    await page.waitForSelector("#fn-amount");
    
    await page.type("#fn-amount", process.env.amount);


    await page.click('button[data-nemo="continue"]');

    // Set tabindex to your prefered payment type. 0 being the first option, -1 being the second option, etc.
    await page.waitForTimeout(10000);
    await page.click('input[tabindex="0"]');

    await page.click('button[data-nemo="choice-next-button"]');

    await page.click('button[data-nemo="send"]');

    console.log('Script is closing...')
    browser.close();
    
  })