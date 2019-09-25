export const config = {

    // Tesla settings
    "mail": "", // Mail address of Tesla Account
    "password": "", // Password of Tesla account
    "rn_number": "RNXXXXXX",

    // Telegram settings
    "bot_key": "", // Access token of the Bot from BotFather
    "telegram_user_id": "", // User ID of telegram to send the user to

    // Node JS settings:
    "only_send_changes": true, // Only send a message when a change in either VIN, vinIsRevealed or delivery date is found
    "timer_minutes": 15, // The amount of each minutes you want the script to start running
}
