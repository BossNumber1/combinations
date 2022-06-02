const botStart = require("../botStart");
const btnCheck = require("../btnCheck");
const btnRepeat = require("../btnRepeat");
const btnsColors = require("../btnsColors");
const btnStart = require("../btnStart");

module.exports = (bot) => {
    botStart(bot); // при запуске
    btnStart(bot); // начинаем
    btnCheck(bot); // анализируем
    btnsColors(bot); // сохраняем цвета и показываем выбор
    btnRepeat(bot); // по новой
};
