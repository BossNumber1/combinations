import { Context } from 'telegraf';
import sendKeyboard from "../sendKeyboard";
import sendStic from "../sendStic";

export default async (ctx: Context, srcId: number, introduction: string, btnValue: string) => {
    await sendStic(ctx, srcId);
    await sendKeyboard(ctx, introduction, btnValue);
};
