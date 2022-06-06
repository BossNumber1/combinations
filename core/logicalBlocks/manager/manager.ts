import { Telegraf } from "telegraf";
import botStart from "../botStart";
import btnCheck from "../btnCheck";
import btnRepeat from "../btnRepeat";
import btnsColors from "../btnsColors";
import btnStart from "../btnStart";

export default (bot: Telegraf) => {
    botStart(bot); // при запуске
    btnStart(bot); // начинаем
    btnCheck(bot); // анализируем
    btnsColors(bot); // сохраняем цвета и показываем выбор
    btnRepeat(bot); // по новой
};
