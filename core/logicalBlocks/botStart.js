const sendKeyboardStick = require("../common/combined/sendKeyboardStick");

module.exports = (bot) => {
    bot.start(async (ctx) => {
        try {
            sendKeyboardStick(ctx, 4, "Поищем сочетание цветов?", "Начать");
        } catch (e) {
            console.error(e);
        }
    });
};
