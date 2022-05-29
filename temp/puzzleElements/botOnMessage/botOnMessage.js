const { analysis } = require("../../../analysis");

module.exports = (bot, receivingSticker) => {
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await receivingSticker(
                chatId,
                "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/4.webp"
            );

            return bot.sendMessage(chatId, `Поищем сочетание цветов?`);
        } else if (text === "/search") {
            return bot.sendMessage(chatId, `Введите первый цвет`);
        } else {
            // получаем цвет
            const firstColor = text;

            //подставляем в анализ
            let result = analysis(firstColor, "розовый");

            if (result === true) {
                return bot.sendMessage(chatId, `Сочетаются`);
            } else {
                return bot.sendMessage(chatId, `Не сочетаются`);
            }
        }
    });
};
