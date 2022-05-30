const commands = require("./otherFunctionality/commands/commands");
const TelegramApi = require("node-telegram-bot-api");
const { gameOptions, againOptions } = require("./options");
const buttonsAction = require("./otherFunctionality/buttonsAction/buttonsAction");

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

    commands(bot, receivingSticker, startSearch);
    buttonsAction(bot, receivingSticker, againOptions, startSearch);
};

start();
