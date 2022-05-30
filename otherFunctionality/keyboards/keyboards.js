module.exports = {
    keyboardColors: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: "Красный", callback_data: "Красный" },
                    { text: "Розовый", callback_data: "Розовый" },
                ],
                [
                    { text: "Жёлтый", callback_data: "Жёлтый" },
                    { text: "Синий", callback_data: "Синий" },
                ],
                [{ text: "Проверить", callback_data: "check" }],
            ],
        }),
    },

    againBtn: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Попробовать ещё раз", callback_data: "again" }],
            ],
        }),
    },
};
