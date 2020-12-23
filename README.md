<p align="center">
  <img width="128" height="128" src="https://github.com/Bchass/AutoPay/blob/master/Logo.png">
</p>

### Function:

- This script will log you into PayPal and send a desired amount to the specified person 🤑
----

### Development: 
 - [Puppeteer-extra](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra)
 - [Puppeteer-Stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth)
 - [dotenv](https://www.npmjs.com/package/dotenv)
----

### Requirements:
1. NPM or Yarn
2. Puppeteer-extra
3. Puppeteer-Stealth
4. Puppeteer-extra-Adblocker (found on the same page as puppeteer-extra)
5. dotenv (add .dotenv to the root directory of the script)
----

### Usage:
- In a terminal type: `node AutoPay.js`
#### dotenv:
- `password = 'your password'`

- `link = 'link to the persons account'`

- `ammount = 'x dollar ammount (1.15)'`

----

 ### TODO:
 - ~~Figure out a new way to go undetected~~
 - Add support for Firefox (on hold as it's still very buggy) [Status](https://puppeteer.github.io/ispuppeteerfirefoxready/)
 - Figure out a better way to implement the cookie
 - ~Transation over to TypeScript~
