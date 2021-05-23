import Command from '../../handler/structures/Command';
import { Context, Server } from '../../utils/types';
import lingua from '../../utils/lingua';
import replace from '../../utils/replace';
import { MessageEmbed } from 'discord.js';
import database from "../../utils/database"
export = class Prefix extends Command {
    constructor() {
        super({
            name: "prefix",
            description: "Invite the bot to your server",
            cooldown: 1,
            // usage: `<subcommand>`
        })
    }

    async command(ctx: Context) {
        let sub = ctx.args[0]
        ctx.args.shift()
        switch (sub) {
            case "list": {
                const embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                    .setTitle(`Prefixes for ${ctx.guild?.name}`)
                    .setDescription(`${[...ctx.config.variables.prefix, ...ctx.settings.prefix].map((prefix, i) => `- ${prefix}\n`).join("")}`)
                return ctx.channel.send(embed)
            }
            case "+":
            case "a":
            case "add": {
                if (ctx.args === [] || ctx.args.join(' ').trim() === '') return ctx.channel.send('No Prefix was given');
                // @ts-ignore
                let { data, error } = await database.from<Server>("servers").update({ prefix: [...ctx.settings.prefix, `${ctx.args.join(" ").trim()}`] }).match({ server_id: ctx.guild?.id })
                // @ts-ignore
                if (error) throw new Error(error)
                const embed = new MessageEmbed()
                    .setColor(ctx.config.variables.color)
                    .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                    .setTitle(`Updated Prefixes for ${ctx.guild?.name}`)
                    .setDescription(`Successfully added \`${ctx.args.join(" ").trim()}\` as an additional prefix on this Server.`)

                return ctx.channel.send(embed)
            }
            case "-":
            case "r":
            case "rm":
            case "remove": {
                if (ctx.args === [] || ctx.args.join(' ').trim() === '') return ctx.channel.send('No Prefix was given');
                if (!ctx.settings.prefix.includes(ctx.args.join(" ").trim())) return ctx.channel.send(`\`${ctx.args.join(" ").trim()}\` is not configured as a prefix on this Server.`)
                let newprefixes = ctx.settings.prefix.filter(prefix => prefix !== ctx.args.join(" ").trim())
                // @ts-ignore
                let { data, error } = await database.from<Server>("servers").update({ prefix: [...newprefixes] }).match({ server_id: ctx.guild?.id })
                // @ts-ignore
                if (error) throw new Error(error)
                const embed = new MessageEmbed()
                    .setColor(ctx.config.variables.color)
                    .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                    .setTitle(`Updated Prefixes for ${ctx.guild?.name}`)
                    .setDescription(`Successfully removed \`${ctx.args.join(" ").trim()}\` from the list of prefixes for this Server.`)

                return ctx.channel.send(embed)

            }

            default: {
                const embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                    .setTitle(`Prefixes for ${ctx.guild?.name}`)
                    .setDescription(`${[...ctx.config.variables.prefix, ...ctx.settings.prefix].map((prefix, i) => `- ${prefix}\n`).join("")}`)
                return ctx.channel.send(embed)

            }

        }
    }
}