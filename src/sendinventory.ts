const { TelegramClient } = require('messaging-api-telegram');
const client = TelegramClient.connect('813993268:AAH26cARVumTTp1Jcz27lI62wAyDEGIr-B4');
const json = require('./../data/inventory.json');
//813993268:AAH26cARVumTTp1Jcz27lI62wAyDEGIr-B4
// Cyw00d ID: 576089049

const CHAT_ID = '576089049';

client.getWebhookInfo().catch(error => {
    console.log(error); // formatted error message
    console.log(error.stack); // error stack trace
    console.log(error.config); // axios request config
    console.log(error.request); // HTTP request
    console.log(error.response); // HTTP response
});

client.getWebhookInfo().then(info => {
    console.log(info);
    // {
    //   url: 'https://4a16faff.ngrok.io/',
    //   has_custom_certificate: false,
    //   pending_update_count: 0,
    //   max_connections: 40,
    // }
  });

//   client.sendMessage(CHAT_ID, 'hi', {
//     disable_web_page_preview: true,
//     disable_notification: true,
//   });
let inventoryList: string = '';
if (json.results.length) {
    // We have inventory, let's make a list out of it:
    json.results.forEach(car => {
        // inventoryList += car.TrimName + '\n' + car.PAINT[0] + ' ' + car.INTERIOR[0] + '\n' + car.VIN + '\n\n';
        inventoryList += car.PAINT[0] + ' (' + car.INTERIOR[0] + ')\n';
    });
}

client.sendMessage(CHAT_ID, `There are ` + json.results.length + ` inventory model 3's.\n\n
The following vehicles are found:
${inventoryList}
`, {
    disable_web_page_preview: true,
    disable_notification: true,
});