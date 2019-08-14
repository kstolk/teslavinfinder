const Telegraf = require('telegraf')

const bot = new Telegraf('813993268:AAH26cARVumTTp1Jcz27lI62wAyDEGIr-B4')
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => { ctx.reply('Hey there'); console.log(JSON.stringify(ctx)) })
bot.launch()