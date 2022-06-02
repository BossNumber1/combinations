require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const botStart = require("./core/logicalBlocks/botStart");
const btnStart = require("./core/logicalBlocks/btnStart");
const btnCheck = require("./core/logicalBlocks/btnCheck");
const btnRepeat = require("./core/logicalBlocks/btnRepeat");
const btnsColors = require("./core/logicalBlocks/btnsColors");

botStart(bot); // при запуске
btnStart(bot); // начинаем
btnCheck(bot); // анализируем
btnsColors(bot); // сохраняем цвета и показываем выбор
btnRepeat(bot); // по новой

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
