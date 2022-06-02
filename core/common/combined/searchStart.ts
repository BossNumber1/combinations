const deleteMessages = require("../deleteMessages");
const hideClock = require("../hideClock");
const selectColors = require("../selectColors");

module.exports = async (ctx, numberMessages: number, introduction: string) => {
    deleteMessages(ctx, numberMessages);
    await hideClock(ctx);
    await selectColors(ctx, introduction);
};
