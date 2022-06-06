import { UserCtx } from './../../types/theirTypes';
import searchStart from "../common/combined/searchStart";
import { Telegraf } from 'telegraf';

export default (bot: Telegraf) => {
    bot.action("Начать", async (ctx: UserCtx) => {
        try {
            searchStart(ctx, 3, `Необходимо выбрать <b>два</b> цвета`);
        } catch (e) {
            console.error(e);
        }
    });
};
