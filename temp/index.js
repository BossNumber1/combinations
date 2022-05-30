const onMessageBot = require("./puzzleElements/botOnMessage/botOnMessage");
const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const onCallback_queryBot = require("./puzzleElements/botOnCallback_query/botOnCallback_query");

require("dotenv").config();
const token = process.env.token;
const bot = new TelegramApi(token, { polling: true });

const startSearch = (chatId) => {
    // ДУБЛИРУЕМАЯ функция запуска сравнения
    return bot.sendMessage(
        chatId,
        `Выберите два цвета для сравнения`,
        gameOptions
    );
};

const start = () => {
    bot.setMyCommands([
        { command: "/search", description: "Искать сочетание" },
    ]);

    async function receivingSticker(chatId, pathToSticker) {
        return bot.sendSticker(chatId, pathToSticker);
    }

    onMessageBot(bot, receivingSticker, startSearch);
    onCallback_queryBot(bot, receivingSticker, againOptions, startSearch);
};

start();
