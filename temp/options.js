module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: "красный", callback_data: "красный" },
                    { text: "розовый", callback_data: "розовый" },
                ],
                [{ text: "проверить", callback_data: "check" }],
            ],
        }),
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Играть ещё раз", callback_data: "/again" }],
            ],
        }),
    },
};
