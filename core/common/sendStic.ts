module.exports = (ctx, srcId: number) => {
    return ctx.replyWithSticker(
        "https://cdn.tlgrm.ru/stickers/c62/4a8/c624a88d-1fe3-403a-b41a-3cdb9bf05b8a/256/" +
            srcId +
            ".webp"
    );
};
