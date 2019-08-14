# teslavinfinder

NodeJS puppeteer script to find VIN in source code of Tesla account

## First time setup:

Make sure you have installed NodeJS, otherwise you won't be able to run the NPM commands.
Type `npm install` from the root folder to get the dependancies

### Telegram setup

Use telegram to chat to BotFather, make a new "Bot" and request the access token. More information about that here: 
https://support.messagebird.com/hc/en-us/articles/209599965-How-to-add-a-Telegram-Bot-to-the-Chat-API

Get your own user ID of telegram, you can do that here:
https://bigone.zendesk.com/hc/en-us/articles/360008014894-How-to-get-the-Telegram-user-ID-

### Setup config file

config.ts should contain the following:

| | |
|--|--|
| mail  | Your Tesla email address |
| password | Your Tesla password |
| rn_number | Your RN number which you can find in the URL when you click "Manage" in your Tesla account|
| bot_key | Telegram bot access token |
|telegram_user_id | Your Telegram user ID |
|alwayssendresult |When set to true, you will get a message anytime the script ran|
|timerminutes| Set to 15, this means every 15 minutes it will do a check if there is a VIN.|
 



## Run script:

From the root folder run      `npm run getvin`
