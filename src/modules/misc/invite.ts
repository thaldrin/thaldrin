import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import lingua from '../../utils/lingua';
import embed from '../../utils/embed';

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
        ctx.channel.send(`${lingua[ctx.settings.locale].INVITE_STRING}:\n<${ctx.config.variables.invite}>`)

    }
}