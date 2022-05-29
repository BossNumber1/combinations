module.exports = (bot, receivingSticker) => {
    bot.on("message", async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === "/start") {
            await receivingSticker(
                chatId,
                "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/4.webp"
            );

            return bot.sendMessage(chatId, `Приветствую`);
        }

        if (text === "/info") {
            return bot.sendMessage(
                chatId,
                `Что тебя интересует ${
                    msg.from.first_name ? msg.from.first_name : ""
                } ${msg.from.last_name ? msg.from.last_name : ""}?`
            );
        }

        return bot.sendMessage(
            chatId,
            "Я тебя не понимаю. Со мной можно общаться лишь командами :)"
        );
    });
};
