// Script by Cyw00d

function delay(time) {
  return new Promise(function(resolve) { 
    setTimeout(resolve, time)
  });
}

const puppeteer = require('puppeteer');
const fs = require('fs');

import * as config from "./../config";
const { TelegramClient } = require('messaging-api-telegram');
const client = TelegramClient.connect(config.config.bot_key);


function searchVin(callback) {
  (async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080
    });

    
    let pageContent = await page.goto('https://www.tesla.com/nl_NL/teslaaccount/product-finalize?rn=' + config.config.rn_number, { options: { waitUntil: 'networkidle0' } });
    // await page.screenshot({path: 'vin.png'}); // make screenshot and save as vin.png
    await page.type('input[placeholder=Email]', config.config.mail, {delay: 10});
    await page.type('input[placeholder=Password]', config.config.password, {delay: 10});
    await page.click('.button.login-button');
    await delay(2000)
    await page.goto('https://www.tesla.com/nl_NL/teslaaccount/product-finalize?rn=' + config.config.rn_number);
    await delay(2000)
    const found = (await page.content()).match(/5YJ3/gi);
    console.log('Found?', found);
    fs.writeFile('./data/vinnumber.json', JSON.stringify({ vin: found }), err => err ? console.log('Data not written: ', err) : console.log('VIN result saved'));
    await browser.close();

    sendVin(callback);
  })();
}

function sendVin(callback) {
  const CHAT_ID = config.config.telegram_user_id;
  const json = require('./../data/vinnumber.json');
  if (json.vin) {
    client.sendMessage(CHAT_ID, `VIN FOUND! ` + json.vin, {
      disable_web_page_preview: true,
    });
  } else if (config.config.alwayssendresult) {
    client.sendMessage(CHAT_ID, `Is there a VIN Found? ` + json.vin, {
      disable_web_page_preview: true,
    });
  }

  callback(); // Make sure the timer gets set again for the next check
}

const timeOutLength = 1000 * 60 * config.config.timerminutes;
function timer(){
  setTimeout(function(){
    searchVin(timer);
  }, timeOutLength);
}
searchVin(timer);