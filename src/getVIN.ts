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
const CHAT_ID = config.config.telegram_user_id;

function search(callback) {
  (async () => {
    const browser = await puppeteer.launch({args: ['--incognito', '--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setCacheEnabled(false);

    await page.setViewport({
      width: 1920,
      height: 1080
    });
    
    let pageContent = await page.goto('https://www.tesla.com/de_DE/teslaaccount/product-finalize?rn=' + config.config.rn_number, { options: { waitUntil: 'networkidle0' } });
    // await page.screenshot({path: 'vin.png'}); // make screenshot and save as vin.png
    try {
      await page.type('input[placeholder=Email]', config.config.mail, {delay: 10});
      await page.type('input[placeholder=Password]', config.config.password, {delay: 10});
      await page.click('.button.login-button');
    } catch(error) {
      console.log('Could not find input fields');
      callback();
      return;
    }

    await delay(2000)
    await page.goto('https://www.tesla.com/de_DE/teslaaccount/product-finalize?rn=' + config.config.rn_number);
    await delay(2000)

		const fullPage = (await page.content());

		const vinReg = /5YJ3.+?(?=\")/gi;
		const vinIsRevealedReg = /\"vinIsRevealed\":(.*?),/gi;
		const deliveryDateReg = /\"DateAndTime\":\"(.*?)\"/gi;

		cur = {
			vin: vinReg.exec(fullPage)[0],
			vinIsRevealed: vinIsRevealedReg.exec(fullPage)[1],
			deliveryDate: deliveryDateReg.exec(fullPage)[1]
		}

    await browser.close();

		fs.writeFile('./vinnumber.json', JSON.stringify(cur), err => err ? console.log('Data not written: ', err) : console.log('Results saved: ' + "\n\tVIN: " + cur.vin + "\n\tVIN is revealed: " + cur.vinIsRevealed + "\n\tDelivery date: " + cur.deliveryDate + "\n"));

    sendVin();
    sendVinIsRevealed();
    sendDeliveryDate();

    callback();
  })();
}

function sendVin() {
	if (cur.vin === old.vin && config.config.only_send_changes)
			console.log('VIN: Nothing changed. Not sending any message.');
	else {
		var message = 'Your Tesla VIN ' + ( cur.vin === old.vin ? 'is unchanged' : 'has CHANGED' ) + ': ' + ( cur.vin ? cur.vin : 'No VIN' );
		if (old.vin)
			message += ' (last VIN: ' + ( old.vin ? old.vin : 'No VIN' ) + ')';

		console.log('Sending message to ' + CHAT_ID + ' - ' + message);
		client.sendMessage(CHAT_ID, message, {
			disable_web_page_preview: true,
		});
	}

	old.vin = cur.vin;
}

function sendVinIsRevealed() {
	if (cur.vinIsRevealed === old.vinIsRevealed && config.config.only_send_changes)
			console.log('VIN isRevealed: Nothing changed. Not sending any message.');
	else {
		var message = 'Your Tesla VIN isRevealed ' + ( cur.vinIsRevealed === old.vinIsRevealed ? 'is unchanged' : 'has CHANGED' ) + ': ' + ( cur.vinIsRevealed ? cur.vinIsRevealed : 'No information' );
		if (old.vinIsRevealed)
			message += ' (last VIN isRevealed: ' + ( old.vinIsRevealed ? old.vinIsRevealed : 'No VIN isRevealed' ) + ')';

		console.log('Sending message to ' + CHAT_ID + ' - ' + message);
		client.sendMessage(CHAT_ID, message, {
			disable_web_page_preview: true,
		});
	}

	old.vinIsRevealed = cur.vinIsRevealed;
}

function sendDeliveryDate() {
	if (cur.deliveryDate === old.deliveryDate && config.config.only_send_changes)
			console.log('Delivery date: Nothing changed. Not sending any message.');
	else {
		var message = 'Your Tesla delivery date ' + ( cur.deliveryDate === old.deliveryDate ? 'is unchanged' : 'has CHANGED' ) + ': ' + ( cur.deliveryDate ? cur.deliveryDate : 'No delivery date' );
		if (old.deliveryDate)
			message += ' (last delivery date: ' + ( old.deliveryDate ? old.deliveryDate : 'No delivery date' ) + ')';

		console.log('Sending message to ' + CHAT_ID + ' - ' + message);
		client.sendMessage(CHAT_ID, message, {
			disable_web_page_preview: true,
		});
	}

	old.deliveryDate = cur.deliveryDate;
}

let cur = {
	vin: null,
	vinIsRevealed: null,
	deliveryDate: null
};
let old = cur;

fs.readFile('./vinnumber.json', 'utf8', (err, json) => {
	if (err) {
		console.log("No previous data found in ./vinnumber.json.\n")
		return
	}
	try {
		const result = JSON.parse(json);

		if (result.vin) old.vin = result.vin;
		if (result.vinIsRevealed) old.vinIsRevealed = result.vinIsRevealed;
		if (result.deliveryDate) old.deliveryDate = result.deliveryDate;

		console.log('Previous results are: ');
		console.log("\tVIN: " + ( old.vin ? old.vin : 'No VIN' ));
		console.log("\tVIN is revealed: " + ( old.vinIsRevealed ? old.vinIsRevealed : 'No information on VIN reveal' ));
		console.log("\tDelivery date: " + ( old.deliveryDate ? old.deliveryDate : 'No information on delivery date' ));
		console.log("\n");

	} catch(err) {
		console.log('Error parsing JSON string in ./vinnumber.json: ', err);
	}
})

const timeOutLength = 1000 * 60 * config.config.timer_minutes;
function startnewtimer(){
	const date = new Date();
	console.log("\n" + date.toString())
	console.log('Next timer started: ' + config.config.timer_minutes + ' minute(s)...');
  setTimeout(function(){
    search(startnewtimer);
  }, timeOutLength);
}
search(startnewtimer);
