import { Context } from 'telegraf';

export default (ctx: Context) => {
    // убираем часы на кнопке
    return ctx.answerCbQuery();
};
