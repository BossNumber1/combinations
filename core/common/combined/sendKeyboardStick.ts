const sendKeyboard = require("../sendKeyboard");
const sendStic = require("../sendStic");

module.exports = async (ctx, srcId: string, introduction: string, btnValue: string) => {
    await sendStic(ctx, srcId);
    await sendKeyboard(ctx, introduction, btnValue);
};
