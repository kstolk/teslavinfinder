export {};

import * as config from "./../config";

const { TelegramClient } = require('messaging-api-telegram');
const client = TelegramClient.connect(config.config.bot_key);
function sendVin(callback) {
    const CHAT_ID = config.config.telegram_user_id;
    const json = require('./../data/kevinvin.json');
    client.sendMessage(CHAT_ID, `Is there a VIN Found? ` + json.vin, {
        disable_web_page_preview: true,
    });
    callback();
}
const timerHalfHour = 1000 * 60 * config.config.timerminutes;
function waitHalfHour(){
  setTimeout(function(){
    sendVin(waitHalfHour);
  }, timerHalfHour);
}
sendVin(waitHalfHour);
