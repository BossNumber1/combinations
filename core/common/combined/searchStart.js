const deleteMessages = require("../deleteMessages");
const hideClock = require("../hideClock");
const selectColors = require("../selectColors");

module.exports = async (ctx, numberMessages, introduction) => {
    deleteMessages(ctx, numberMessages);
    await hideClock(ctx);
    await selectColors(ctx, introduction);
};
