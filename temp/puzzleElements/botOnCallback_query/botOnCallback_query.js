const { analysis } = require("../../../analysis");

// для хранения выбранных цветов
let colorsDB = {
    firstColor: "",
    secondColor: "",
};

module.exports = (bot, receivingSticker, againOptions) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        // сохраняем цвета
        if (data === "красный") {
            colorsDB.firstColor = data;
        }

        if (data === "розовый") {
            colorsDB.secondColor = data;
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
                    return bot.sendMessage(chatId, answer);
                });
            }
        }
    });
};
