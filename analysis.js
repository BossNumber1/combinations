const matchingColors = require("./matchingColors");

function analysis(firstColor, secondColor) {
    // проверка на совместимость
    for (let i = 0; i < matchingColors.length; i++) {
        if (
            (matchingColors[i].basic === firstColor &&
                matchingColors[i].additional === secondColor) ||
            (matchingColors[i].basic === secondColor &&
                matchingColors[i].additional === firstColor)
        ) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = { analysis };
