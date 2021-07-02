import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import lingua from '../../utils/lingua';
import { MessageEmbed } from 'discord.js';

function enabled(a: boolean, lang: string) {
    // @ts-ignore
    return a ? lingua[lang].MISC.ENABLED : lingua[lang].MISC.DISABLED
}

export = class Settings extends Command {
    constructor() {
        super({
            name: "settings",
            description: "See and change the Bot's Settings",
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let settings = ctx.settings
        const Embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        console.log(settings)
        // Embed.addField("")
    }
}