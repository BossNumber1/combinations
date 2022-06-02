module.exports = (ctx, numberMessages) => {
    // стираем прежние сообщения
    let message_id = ctx.update.callback_query.message.message_id;

    if (numberMessages === 2) {
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);
    }

    if (numberMessages === 3) {
        ctx.deleteMessage(message_id);
        ctx.deleteMessage(message_id - 1);
        ctx.deleteMessage(message_id - 2);
    }
};
