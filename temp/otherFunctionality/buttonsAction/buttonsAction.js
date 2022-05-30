const { analysis } = require("../../../analysis");

// для хранения выбранных цветов
let selectedColors = {
    firstColor: "",
    secondColor: "",
};

module.exports = (bot, receivingSticker, againOptions, startSearch) => {
    bot.on("callback_query", async (msg) => {
        const buttonValue = msg.data;
        const chatId = msg.message.chat.id;

        if (buttonValue === "again") {
            // обнуляем пару
            selectedColors.firstColor = "";
            selectedColors.secondColor = "";

            startSearch(chatId);
        }

        // сохраняем цвета
        if (
            buttonValue !== "check" &&
            buttonValue !== "again" &&
            (!selectedColors.firstColor || !selectedColors.secondColor)
        ) {
            if (!selectedColors.firstColor) {
                selectedColors.firstColor = buttonValue;
            } else {
                selectedColors.secondColor = buttonValue;
            }
        }

        // анализируем
        if (buttonValue === "check") {
            let result = analysis(
                selectedColors.firstColor,
                selectedColors.secondColor
            );

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
