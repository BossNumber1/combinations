const { Telegraf } = require("telegraf");
const { analysis } = require("./core/analysis/analysis");
const text = require("./core/consts/consts");
const selectColors = require("./core/common/selectColors");
const sendStic = require("./core/common/sendStic");
const sendKeyboard = require("./core/common/sendKeyboard");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// для хранения выбранных цветов
let selectedColors = {
    firstColor: "",
    secondColor: "",
};

// common fncts

bot.start(async (ctx) => {
    try {
        await sendStic(ctx, 4);
        await sendKeyboard(ctx, "Поищем сочетание цветов?", "Начать");
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
function addActionBot(buttonValue, text) {
    bot.action(buttonValue, async (ctx) => {
        try {
            // убираем часы на кнопке
            await ctx.answerCbQuery();

            // отправляем текст и сохраняем цвета
            if (!selectedColors.firstColor || !selectedColors.secondColor) {
                if (!selectedColors.firstColor) {
                    selectedColors.firstColor = buttonValue;
                    await sendKeyboard(ctx, text);
                } else {
                    selectedColors.secondColor = buttonValue;
                    await sendKeyboard(ctx, text, "Проверить");
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
}

addActionBot("Красный", `Вы выбрали <b>${text.red}</b>`);
addActionBot("Розовый", `Вы выбрали <b>${text.pink}</b>`);
addActionBot("Жёлтый", `Вы выбрали <b>${text.yellow}</b>`);
addActionBot("Синий", `Вы выбрали <b>${text.blue}</b>`);

// анализируем
bot.action("Проверить", async (ctx) => {
    try {
        let srcId, answer;

        function comparison() {
            // сравниваем цвета
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
        }

        comparison();

        // стираем прежние сообщения
        let message_id = ctx.update.callback_query.message.message_id;
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);
        ctx.deleteMessage(message_id - 2);

        // убираем часы на кнопке
        await ctx.answerCbQuery();

        // отправляем стикер
        await sendStic(ctx, srcId);

        // отправляем текст
        await sendKeyboard(
            ctx,
            `${
                selectedColors.firstColor
            } и ${selectedColors.secondColor.toLowerCase()} <b>${answer}</b>`,
            "Повторить"
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
