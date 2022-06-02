require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);
const botStart = require("./core/logicalBlocks/botStart");
const btnStart = require("./core/logicalBlocks/btnStart");
const btnCheck = require("./core/logicalBlocks/btnCheck");
const btnRepeat = require("./core/logicalBlocks/btnRepeat");
const btnsColors = require("./core/logicalBlocks/btnsColors");

botStart(bot);
btnStart(bot);
btnCheck(bot); // анализируем
btnRepeat(bot); // начинаем заново
btnsColors(bot); // показываем выбор и сохраняем цвета

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
