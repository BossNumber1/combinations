import { Markup, Context } from "telegraf";

export default (ctx: Context, introduction: string) => {
    return ctx.replyWithHTML(
        introduction,
        Markup.inlineKeyboard([
            [
                Markup.button.callback("Красный", "Красный"),
                Markup.button.callback("Розовый", "Розовый"),
            ],
            [
                Markup.button.callback("Жёлтый", "Жёлтый"),
                Markup.button.callback("Синий", "Синий"),
            ],
        ])
    );
};
