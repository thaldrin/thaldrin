import { Command } from '@thaldrin/eu';

import { Context } from '../../../utils/types';
import language from '../../../utils/language';
import replace from '../../../utils/replace';

export = class Invite extends Command {
    constructor() {
        super({
            name: "invite",
            description: "Invite the bot to your server",
            aliases: ["inv"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        // TODO: generate custom invites for every server
        // @ts-ignore
        ctx.channel.send(`${replace(/BOT/gi, ctx.config.variables.name, language.get(ctx.settings.locale).misc.invite)}:\n<${ctx.config.variables.invite}>`)

    }
}