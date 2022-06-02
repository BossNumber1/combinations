const { Telegraf } = require("telegraf");
const { analysis } = require("./core/analysis/analysis");
const text = require("./core/consts/consts");
const sendKeyboard = require("./core/common/sendKeyboard");
const hideClock = require("./core/common/hideClock");
const deleteMessages = require("./core/common/deleteMessages");
const selectedColors = require("./core/db/selectedColors");
const searchStart = require("./core/common/combined/searchStart");
const sendKeyboardStick = require("./core/common/combined/sendKeyboardStick");

require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

// common fncts

bot.start(async (ctx) => {
    try {
        sendKeyboardStick(ctx, 4, "Поищем сочетание цветов?", "Начать");
    } catch (e) {
        console.error(e);
    }
});

bot.action("Начать", async (ctx) => {
    try {
        searchStart(ctx, 3, `Необходимо выбрать <b>два</b> цвета`);
    } catch (e) {
        console.error(e);
    }
});

function buttonClickHandler() {
    // показываем выбор и сохраняем цвета
    function core(buttonValue, text) {
        bot.action(buttonValue, async (ctx) => {
            try {
                await hideClock(ctx);

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

    // вешаем на каждую кнопку цвета
    const btnsList = [
        { btnValue: "Красный", answer: `Вы выбрали <b>${text.red}</b>` },
        { btnValue: "Розовый", answer: `Вы выбрали <b>${text.pink}</b>` },
        { btnValue: "Жёлтый", answer: `Вы выбрали <b>${text.yellow}</b>` },
        { btnValue: "Синий", answer: `Вы выбрали <b>${text.blue}</b>` },
    ];

    btnsList.map((el) => core(el.btnValue, el.answer));
}

buttonClickHandler();

// анализируем
bot.action("Проверить", async (ctx) => {
    try {
        let srcId, answer;
        await hideClock(ctx);

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

// обнуляем БД и начинаем заново
bot.action("Повторить", async (ctx) => {
    try {
        // обнуляем пару
        selectedColors.firstColor = "";
        selectedColors.secondColor = "";

        searchStart(ctx, 2, `Выбираем снова <b>два</b> цвета`);
    } catch (e) {
        console.error(e);
    }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
