import { Update } from 'telegraf/typings/core/types/typegram';
import { Context } from 'telegraf';

export type UserCtx = Context & { update: Update.CallbackQueryUpdate }