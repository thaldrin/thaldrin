import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import lingua from '../../utils/lingua';
import { Folders, Commands } from "../../utils/command.amount";
import { MessageEmbed } from 'discord.js';

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
        let embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)

        if (ctx.args.length === 0) {
            await (await Folders()).forEach(async folder => {
                if (!ctx.isDeveloper && folder === 'developer') return
                // @ts-ignore
                return embed.addField(`${lingua[ctx.settings.locale].CATEGORIES[folder.toUpperCase()].name || folder} [\`${[...(await Commands(folder, ctx.client))].length}\`]`, `\`${ctx.config.variables.prefix[2]} help ${folder}\``, true)
            })
            embed.setTitle("Help")
            return ctx.channel.send(embed)
        }
        let arg = ctx.args[0]
        if (await (await Folders()).includes(arg)) {

            let commands = await (await Commands(arg, ctx.client)).map(command => `\`${command.name}\` - ${command.description}`)
            embed.addField("Commands", commands.join("\n"))
            // @ts-ignore
            embed.setTitle(`${lingua[ctx.settings.locale].CATEGORIES[arg.toUpperCase()].name || arg}`)
            return ctx.channel.send(embed)
        }


    }
}