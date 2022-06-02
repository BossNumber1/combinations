const searchStart = require("../common/combined/searchStart");
const selectedColors = require("../db/selectedColors");

module.exports = (bot) => {
    bot.action("Повторить", async (ctx) => {
        try {
            // обнуляем пару
            selectedColors.firstColor = "";
            selectedColors.secondColor = "";

            searchStart(ctx, 2, `Выбираем снова <b>два</b> цвета`);
        } catch (e) {
            console.error(e);
        }
    });
};
