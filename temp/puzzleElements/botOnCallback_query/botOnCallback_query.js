const { analysis } = require("../../../analysis");
const onMessageBot = require("../botOnMessage/botOnMessage");

// для хранения выбранных цветов
let colorsDB = {
    firstColor: "",
    secondColor: "",
};

module.exports = (
    bot,
    receivingSticker,
    againOptions,
    startSearch,
    gameOptions
) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === "again") {
            // обнуляем пару
            colorsDB.firstColor = "";
            colorsDB.secondColor = "";

            // onMessageBot(bot, receivingSticker, gameOptions);
            return bot.sendMessage(
                chatId,
                `Выберите два цвета для сравнения`,
                gameOptions
            );
            //return bot.sendMessage(chatId, gameOptions);
            //return startSearch(chatId);
        }

        // сохраняем цвета
        if (
            data !== "check" &&
            (!colorsDB.firstColor || !colorsDB.secondColor)
        ) {
            if (!colorsDB.firstColor) {
                colorsDB.firstColor = data;
            } else {
                colorsDB.secondColor = data;
            }
        }

        // анализируем
        if (data === "check") {
            let result = analysis(colorsDB.firstColor, colorsDB.secondColor);

            if (result === true) {
                core("1", "Сочетаются");
            } else {
                core("47", "Не сочетаются");
            }

            function core(id, answer) {
                receivingSticker(
                    chatId,
                    "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/" +
                        id +
                        ".webp"
                ).then(() => {
                    return bot.sendMessage(chatId, answer, againOptions);
                });
            }
        }
    });
};
