import { Context, Telegraf } from 'telegraf';
const consts = require("../consts/consts");
import hideClock from "../common/hideClock";
import sendKeyboard from "../common/sendKeyboard";
import selectedColors from "../db/selectedColors";

export default (bot: Telegraf) => {
    function core(buttonValue: string, answer: string) {
        bot.action(buttonValue, async (ctx: Context) => {
            try {
                await hideClock(ctx);

                // отправляем текст и сохраняем цвета
                if (!selectedColors.firstColor || !selectedColors.secondColor) {
                    if (!selectedColors.firstColor) {
                        selectedColors.firstColor = buttonValue;
                        await sendKeyboard(ctx, answer, "");
                    } else {
                        selectedColors.secondColor = buttonValue;
                        await sendKeyboard(ctx, answer, "Проверить");
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });
    }

    // вешаем на каждую кнопку цвета
    const btnsList = [
        { btnValue: "Красный", answer: `Вы выбрали <b>${consts.red}</b>` },
        { btnValue: "Розовый", answer: `Вы выбрали <b>${consts.pink}</b>` },
        { btnValue: "Жёлтый", answer: `Вы выбрали <b>${consts.yellow}</b>` },
        { btnValue: "Синий", answer: `Вы выбрали <b>${consts.blue}</b>` },
    ];

    btnsList.map((el) => core(el.btnValue, el.answer));
};
