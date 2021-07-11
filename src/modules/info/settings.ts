import Command from '../../handler/structures/Command';
import { Context, Server } from '../../utils/types';
import lingua from '../../utils/lingua';
import { MessageEmbed } from 'discord.js';
import database from "../../utils/database"
import language from '../../utils/language';

function enabled(a: boolean, lang: string) {
    // @ts-ignore
    return a ? language.get(lang).misc.enabled : language.get(lang).misc.disabled;
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
        let sub = ctx.args[0]
        ctx.args.shift()
        let value = ctx.args[0]
        const Embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)

        switch (sub) {
            case "toggle":
                switch (value) {
                    case "shortlinks":
                    case "sl":
                    case "shorts":
                        {
                            // @ts-ignore
                            let { data, error } = await database.from<Server>("servers").update({ shortlinks: !ctx.settings.shortlinks }).match({ server_id: ctx.guild?.id })
                            // @ts-ignore
                            if (error) throw new Error(error)
                            const embed = new MessageEmbed()
                                .setColor(ctx.config.variables.color)
                                .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                                .setTitle(`Toggled Shortlink for ${ctx.guild?.name}`)
                                .setDescription(`Successfully ${enabled(!ctx.settings.shortlinks, ctx.settings.locale)} Shortlinks on this Server.`)

                            return ctx.channel.send(embed)

                        }
                    case "sourcefinder":
                    case "sf":
                    case "sauce":
                        {
                            // @ts-ignore
                            let { data, error } = await database.from<Server>("servers").update({ sourcefinder: !ctx.settings.sourcefinder }).match({ server_id: ctx.guild?.id })
                            // @ts-ignore
                            if (error) throw new Error(error)
                            const embed = new MessageEmbed()
                                .setColor(ctx.config.variables.color)
                                .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                                .setTitle(`Toggled Sourcefinder for ${ctx.guild?.name}`)
                                .setDescription(`Successfully ${enabled(!ctx.settings.sourcefinder, ctx.settings.locale)} Sourcefinder on this Server.`)

                            return ctx.channel.send(embed)

                        }
                    case "embeds":
                    case "imageembeds":
                        {
                            // @ts-ignore
                            let { data, error } = await database.from<Server>("servers").update({ embeds: !ctx.settings.embeds }).match({ server_id: ctx.guild?.id })
                            // @ts-ignore
                            if (error) throw new Error(error)
                            const embed = new MessageEmbed()
                                .setColor(ctx.config.variables.color)
                                .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                                .setTitle(`Toggled Embeds for ${ctx.guild?.name}`)
                                .setDescription(`Successfully ${enabled(!ctx.settings.embeds, ctx.settings.locale)} Embeds for this Server.`)

                            return ctx.channel.send(embed)

                        }
                    case "interactions":
                    case "rptext":
                        {
                            // @ts-ignore
                            let { data, error } = await database.from<Server>("servers").update({ interaction_text: !ctx.settings.interaction_text }).match({ server_id: ctx.guild?.id })
                            // @ts-ignore
                            if (error) throw new Error(error)
                            const embed = new MessageEmbed()
                                .setColor(ctx.config.variables.color)
                                .setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
                                .setTitle(`Toggled RP Text on RP Commands for ${ctx.guild?.name}`)
                                .setDescription(`Successfully ${enabled(!ctx.settings.interaction_text, ctx.settings.locale)} RP Text for this Server.`)

                            return ctx.channel.send(embed)

                        }
                    // case "shortlinks":
                    // case "sl":
                    // case "shorts":

                    // case "sourcefinder":
                    // case "sf":
                    // case "sauce": 

                    // case "embeds":
                    // case "imageembeds": 

                    // case "interactions":
                    // case "rptext":
                    default:
                        // @ts-ignore
                        Embed.setDescription(`${lingua[settings.locale].MISSING.VALUE.SETTING}
                        
                        **Valid Settings**:
                        - shortlinks
                        - shorts
                        - sl

                        - sourcefinder
                        - sauce
                        - sf

                        - embeds
                        - imageembeds

                        - interactions
                        - rptext`)
                        return ctx.channel.send(Embed)
                }

            default: {
                Embed.setTitle("Settings for " + ctx.guild?.name)
                    .setDescription(`
                    **Prefixes**

                    - ${settings.prefix.join("\n- ")}`)
                    .addField("Shortlinks", enabled(settings.shortlinks, settings.locale), true)
                    .addField("Sourcefinder", enabled(settings.sourcefinder, settings.locale), true)
                    .addField("*_ _*", "*_ _*", true)
                    .addField("RP Text", enabled(settings.interaction_text, settings.locale), true)
                    .addField("Image Embeds", enabled(settings.embeds, settings.locale), true)
            }
        }



        ctx.channel.send(Embed)
    }
}