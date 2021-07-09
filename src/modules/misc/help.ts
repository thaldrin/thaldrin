import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import language from '../../utils/language';
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
                return embed.addField(`${language.get(ctx.settings.locale).categories[folder.toLowerCase()].name || folder} [\`${[...(await Commands(folder, ctx.client))].length}\`]`, `\`${ctx.config.variables.prefix[0]} help ${folder}\``, true)
            })
            embed.setTitle(`${ctx.config.variables.name} Help`)
            return ctx.channel.send(embed)
        }
        let arg = ctx.args[0]
        if (await (await Folders()).includes(arg)) {
            if (arg === 'developer') return
            let commands = await (await Commands(arg, ctx.client)).map(command => `\`${command.name}\` - ${command.description}`)
            embed.addField("Commands", commands.join("\n"))
            // @ts-ignore
            embed.setTitle(`${language.get(ctx.settings.locale).categories[folder.toLowerCase()].name || arg}`)
            // @ts-ignore
            embed.setDescription(`${language.get(ctx.settings.locale).categories[folder.toLowerCase()].desc || ""}\n\nTotal Commands: **${commands.length}**`)
            return ctx.channel.send(embed)
        }
        // @ts-ignore
        let command = ctx.client.commands.find((c) => c.name.toLowerCase() == arg || (c.aliases && c.aliases.includes(arg)))
        // let aliases = ctx.client.commands.filter()
        if (command) {
            embed.setTitle("Command Help")
            if (command.aliases?.length !== 0) embed.addField("Aliases", `⇒\`${command.aliases?.join("`\n⇒`")}\``, true)
            // @ts-ignore
            embed.setDescription(`**Cooldown:** ${command.cooldown}s\n**Module:** ${language.get(ctx.settings.locale).categories[folder.toLowerCase()].name || command.module}\n**NSFW:** ${command.nsfw}`)
            embed.addField("Usage", `\`thal ${command.name}\` ${command.usage}`, true)
            ctx.channel.send(embed)
        }

    }
}