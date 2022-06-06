require("dotenv").config();
import { Telegraf } from "telegraf";
import manager from "./core/logicalBlocks/manager/manager"

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.launch();

manager(bot); // весь нужный код

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
