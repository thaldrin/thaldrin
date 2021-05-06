import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import lingua from '../../utils/lingua';
import { Folders, Commands } from "../../utils/command.amount";
import embed from '../../utils/embed';
export = class Help extends Command {
    constructor() {
        super({
            name: "help",
            aliases: ['?', 'h'],
            description: "Get help with the Bot",
            cooldown: 1,
        })
    }

    // ? [ 'developer', 'general', 'images', 'misc', 'roleplay' ]

    async command(ctx: Context) {
        if (ctx.args.length === 0) {
            embed.setTitle("Help")
            await (await Folders()).forEach(async folder => {
                if (!ctx.isDeveloper && folder === 'developer') return
                // @ts-ignore
                embed.addField(`${lingua[ctx.settings.locale].CATEGORIES[folder.toUpperCase()].name || folder} [\`${[...(await Commands(folder, ctx.client))].length}\`]`, `\`${ctx.config.variables.prefix[2]} help ${folder}\``, true)
            })
            return ctx.channel.send(embed)
        }

        ctx.channel.send(embed)

    }
}