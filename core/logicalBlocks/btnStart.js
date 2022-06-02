const searchStart = require("../common/combined/searchStart");

module.exports = (bot) => {
    bot.action("Начать", async (ctx) => {
        try {
            searchStart(ctx, 3, `Необходимо выбрать <b>два</b> цвета`);
        } catch (e) {
            console.error(e);
        }
    });
};
