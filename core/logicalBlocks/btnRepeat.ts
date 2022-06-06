import { UserCtx } from './../../types/theirTypes';
import searchStart from "../common/combined/searchStart";
import selectedColors from "../db/selectedColors";

export default (bot: any) => {
    bot.action("Повторить", async (ctx: UserCtx) => {
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
