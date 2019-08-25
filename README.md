# teslavinfinder

NodeJS puppeteer script to find the VIN, vinIsRevealed and delivery date in source code of Tesla account.

Based on the orginial script by https://github.com/Cyw00d/teslavinfinder this script now also finds vinIsRevealed and delivery date, keeps the previous data cached and sends messages when something changes, as well.

## First time setup:
Everything runs in the command line.

Make sure you have installed NodeJS (https://nodejs.org/en/download/), otherwise you won't be able to run the NPM commands.
Type `npm install` from the root folder to get the dependancies

### Telegram setup

Use telegram to chat to BotFather, make a new "Bot" and request the access token. More information about that here: 
https://support.messagebird.com/hc/en-us/articles/209599965-How-to-add-a-Telegram-Bot-to-the-Chat-API

Get your own user ID of telegram, you can do that here:
https://bigone.zendesk.com/hc/en-us/articles/360008014894-How-to-get-the-Telegram-user-ID-

When this is in place make sure you open a new conversation with your own Bot so you'll receive the messages the script will send you.

### Setup config file

config.ts should contain the following:

| | |
|--|--|
| mail  | Your Tesla email address |
| password | Your Tesla password |
| rn_number | Your RN number which you can find in the URL when you click "Manage" in your Tesla account |
| bot_key | Telegram bot access token |
|telegram_user_id | Your Telegram user ID |
|only_send_changes | Only send a message when a change in either VIN, vinIsRevealed or delivery date is found |
|timer_minutes | Set to 15, this means every 15 minutes it will do a check if there is a VIN |

## Run script:

From the root folder run      `npm run getvin`
