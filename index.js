require("dotenv").config();
const { Telegraf } = require("telegraf");
const manager = require("./core/logicalBlocks/manager/manager");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.launch();

manager(bot); // весь нужный код

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
