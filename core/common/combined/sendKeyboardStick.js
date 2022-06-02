const sendKeyboard = require("../sendKeyboard");
const sendStic = require("../sendStic");

module.exports = async (ctx, srcId, introduction, btnValue) => {
    await sendStic(ctx, srcId);
    await sendKeyboard(ctx, introduction, btnValue);
};
