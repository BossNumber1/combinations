const onMessageBot = require("./puzzleElements/botOnMessage/botOnMessage");
const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();
const token = process.env.token;
const bot = new TelegramApi(token, { polling: true });

const start = () => {
    bot.setMyCommands([
        { command: "/info", description: "Получить информацию" },
    ]);

    async function receivingSticker(chatId, pathToSticker) {
        return bot.sendSticker(chatId, pathToSticker);
    }

    onMessageBot(bot, receivingSticker);
};

start();
