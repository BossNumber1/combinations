import { Markup, Context } from "telegraf";

export default (ctx: Context, introduction: string, btnValue: string) => {
    if (btnValue !== "") {
        return ctx.replyWithHTML(
            introduction,
            Markup.inlineKeyboard([
                [Markup.button.callback(btnValue, btnValue)],
            ])
        );
    } else {
        return ctx.replyWithHTML(introduction);
    }
};
