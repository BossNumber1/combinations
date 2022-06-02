const { Telegraf, Markup } = require("telegraf");
const { analysis } = require("./analysis");
const text = require("./consts");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// для хранения выбранных цветов
let selectedColors = {
    firstColor: "",
    secondColor: "",
};

// common functions
function selectColors(ctx, introduction) {
    return ctx.replyWithHTML(
        introduction,
        Markup.inlineKeyboard([
            [
                Markup.button.callback("Красный", "Красный"),
                Markup.button.callback("Розовый", "Розовый"),
            ],
            [
                Markup.button.callback("Жёлтый", "Жёлтый"),
                Markup.button.callback("Синий", "Синий"),
            ],
        ])
    );
}

bot.start(async (ctx) => {
    try {
        await ctx.replyWithSticker(
            "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/4.webp"
        );
        await ctx.reply(
            "Поищем сочетание цветов?",
            Markup.inlineKeyboard([
                [Markup.button.callback("Начать", "Начать")],
            ])
        );
    } catch (e) {
        console.error(e);
    }
});

bot.action("Начать", async (ctx) => {
    try {
        // стираем прежние сообщения
        let message_id = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);
        ctx.deleteMessage(message_id - 2);

        // убираем часы на кнопке
        await ctx.answerCbQuery();
        await selectColors(ctx, `Необходимо выбрать <b>два</b> цвета`);
    } catch (e) {
        console.error(e);
    }
});

// отправляем выбор и сохраняем цвета
function addActionBot(buttonValue, srcId, text) {
    bot.action(buttonValue, async (ctx) => {
        try {
            // убираем часы на кнопке
            await ctx.answerCbQuery();

            // отправляем стикер
            if (srcId !== false) {
                await ctx.replyWithSticker(
                    "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/" +
                        srcId +
                        ".webp"
                );
            }

            // отправляем текст и сохраняем цвета
            if (!selectedColors.firstColor || !selectedColors.secondColor) {
                if (!selectedColors.firstColor) {
                    selectedColors.firstColor = buttonValue;
                    await ctx.replyWithHTML(text);
                } else {
                    selectedColors.secondColor = buttonValue;
                    await ctx.replyWithHTML(
                        text,
                        Markup.inlineKeyboard([
                            [Markup.button.callback("Проверить", "Проверить")],
                        ])
                    );
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
}

addActionBot("Красный", false, `Вы выбрали <b>${text.red}</b>`);
addActionBot("Розовый", false, `Вы выбрали <b>${text.pink}</b>`);
addActionBot("Жёлтый", false, `Вы выбрали <b>${text.yellow}</b>`);
addActionBot("Синий", false, `Вы выбрали <b>${text.blue}</b>`);

// анализируем
bot.action("Проверить", async (ctx) => {
    try {
        // наполняем - нужными - данными
        let srcId, answer;

        let result = analysis(
            selectedColors.firstColor,
            selectedColors.secondColor
        );

        if (result === true) {
            srcId = 1;
            answer = text.combined;
        } else {
            srcId = 47;
            answer = text.noCombined;
        }

        // стираем прежние сообщения
        let message_id = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);
        ctx.deleteMessage(message_id - 2);

        // убираем часы на кнопке
        await ctx.answerCbQuery();

        // отправляем стикер
        if (srcId !== false) {
            await ctx.replyWithSticker(
                "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/" +
                    srcId +
                    ".webp"
            );
        }

        // отправляем текст
        await ctx.replyWithHTML(
            `${
                selectedColors.firstColor
            } и ${selectedColors.secondColor.toLowerCase()} <b>${answer}</b>`,
            Markup.inlineKeyboard([
                [Markup.button.callback("Повторить", "Повторить")],
            ])
        );
    } catch (e) {
        console.error(e);
    }
});

// обнуляем БД и начинаем заново
bot.action("Повторить", async (ctx) => {
    try {
        // обнуляем пару
        selectedColors.firstColor = "";
        selectedColors.secondColor = "";

        // стираем прежние сообщения
        let message_id = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);

        // убираем часы на кнопке
        await ctx.answerCbQuery();
        await selectColors(ctx, `Выбираем снова <b>два</b> цвета`);
    } catch (e) {
        console.error(e);
    }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
