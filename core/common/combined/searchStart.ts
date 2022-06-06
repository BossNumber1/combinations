import { UserCtx } from './../../../types/theirTypes';
import deleteMessages from "../deleteMessages";
import hideClock from "../hideClock";
import selectColors from "../selectColors";

export default async (ctx: UserCtx, numberMessages: number, introduction: string) => {
    deleteMessages(ctx, numberMessages);
    await hideClock(ctx);
    await selectColors(ctx, introduction);
};
