const { analysis } = require("../analysis/analysis");
const sendKeyboardStick = require("../common/combined/sendKeyboardStick");
const deleteMessages = require("../common/deleteMessages");
const hideClock = require("../common/hideClock");
const selectedColors = require("../db/selectedColors");
const consts = require("../consts/consts");

module.exports = (bot) => {
    bot.action("Проверить", async (ctx) => {
        try {
            let srcId, answer;
            await hideClock(ctx);

            function comparison() {
                // сравниваем цвета
                let result = analysis(
                    selectedColors.firstColor,
                    selectedColors.secondColor
                );

                if (result === true) {
                    srcId = 1;
                    answer = consts.combined;
                } else {
                    srcId = 47;
                    answer = consts.noCombined;
                }
            }

            comparison();
            deleteMessages(ctx, 3);
            sendKeyboardStick(
                ctx,
                srcId,
                `${
                    selectedColors.firstColor
                } и ${selectedColors.secondColor.toLowerCase()} <b>${answer}</b>`,
                "Повторить"
            );
        } catch (e) {
            console.error(e);
        }
    });
};
