import { Context, Telegraf } from "telegraf";
import sendKeyboardStick from "../common/combined/sendKeyboardStick";

export default (bot: Telegraf) => {
    bot.start(async (ctx: Context) => {
        try {
            sendKeyboardStick(ctx, 4, "Поищем сочетание цветов?", "Начать");
        } catch (e) {
            console.error(e);
        }
    });
};
