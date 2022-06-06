import { UserCtx } from './../../types/theirTypes';
import { analysis } from "../analysis/analysis";
import sendKeyboardStick from "../common/combined/sendKeyboardStick";
import deleteMessages from "../common/deleteMessages";
import hideClock from "../common/hideClock";
import selectedColors from "../db/selectedColors";
import { Telegraf } from 'telegraf';
const consts = require("../consts/consts");

export default (bot: Telegraf) => {
    bot.action("Проверить", async (ctx: UserCtx) => {
        try {
            let srcId: number, answer: string;
            await hideClock(ctx);

            function comparison() {
                // сравниваем цвета
                let result: boolean = analysis(
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
