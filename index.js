const buttonsAction = require("./otherFunctionality/buttonsAction/buttonsAction");
const commands = require("./otherFunctionality/commands/commands");
const {
    keyboardColors,
    againBtn,
} = require("./otherFunctionality/keyboards/keyboards");
const TelegramApi = require("node-telegram-bot-api");

require("dotenv").config();
const token = process.env.token;
const bot = new TelegramApi(token, { polling: true });

const startSearch = (chatId) => {
    // ДУБЛИРУЕМАЯ функция запуска сравнения
    return bot.sendMessage(
        chatId,
        `Выберите два цвета для сравнения`,
        keyboardColors
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
    buttonsAction(bot, receivingSticker, againBtn, startSearch);
};

start();
