const { Markup } = require("telegraf");

module.exports = (ctx, introduction, btn) => {
    if (btn) {
        return ctx.replyWithHTML(
            introduction,
            Markup.inlineKeyboard([[Markup.button.callback(btn, btn)]])
        );
    } else {
        return ctx.replyWithHTML(introduction);
    }
};
