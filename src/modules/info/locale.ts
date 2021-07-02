// @ts-nocheck
import Command from '../../handler/structures/Command';
import { Context, Server } from '../../utils/types';
import database from "../../utils/database"
import lingua from '../../utils/lingua';
import { MessageEmbed } from 'discord.js';
import replace from '../../utils/replace';

function enabled(a: boolean, lang: string) {
    // @ts-ignore
    return a ? lingua[lang].MISC.ENABLED : lingua[lang].MISC.DISABLED
}
function user(ctx: Context, id: string) {
    let x = ctx.client.users.cache.get(id)
    return x
}
export = class Locale extends Command {
    constructor() {
        super({
            name: "locale",
            description: "See and change the Bot's Language",
            cooldown: 1,
            AuthorPermissions: ["MANAGE_GUILD"]
        })
    }

    async command(ctx: Context) {
        let sub = ctx.args[0]
        ctx.args.shift()
        let language = ctx.settings.locale
        let validLangs = Object.entries(lingua).map(([key, value]) => (key))
        const Embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        switch (sub) {
            case "list": {
                let langs = Object.entries(lingua).map(([key, value]) => (`${replace(/LANGUAGE/gi, `**${value.META.name} (${value.META.locale})**`, replace(/TRANSLATOR/gi, `**${user(ctx, value.META.tranlators[0]).tag}**`, lingua[language].LOCALE.TITLE))}\n${replace(/AMOUNT/gi, value.META.tranlators.length, lingua[language].LOCALE.CONTRIBUTORS)}\n\`${ctx.config.variables.prefix[0]} locale set ${value.META.locale}\``))
                let topdesc = replace(/BOT/gi, ctx.config.variables.name, replace(/AMOUNT/gi, langs.length, replace(/PREFIX/gi, ctx.config.variables.prefix[0], lingua[language].LOCALE.COMMAND_DESC)))
                Embed.setTitle(lingua[language].LOCALE.DEFAULT.LANGUAGES).setDescription(`${topdesc}\n\n${langs.join(`\n\n`)}`)
                return ctx.channel.send(Embed)
            }
            case "set": {
                console.log(validLangs)
                if (ctx.args === [] || ctx.args.join(' ').trim() === '') return ctx.channel.send(lingua[language].MISSING.VALUE.COUNTRY);
                if (!validLangs.includes(ctx.args[0])) return ctx.channel.send(replace(/BOT/gi, ctx.config.variables.name, replace(/VALUE/gi, ctx.args.join(" "), lingua[language].LOCALE.UNSUPPORTED)))

                let { data, error } = await database.from<Server>('servers').update({ locale: ctx.args[0] }).match({ server_id: ctx.guild?.id })
                if (error) throw new Error(error)
                Embed.setTitle(replace(/SETTING/gi, lingua[ctx.args[0]].LOCALE.DEFAULT.LANGUAGE, replace(/VALUE/gi, ctx.args[0], lingua[ctx.args[0]].LOCALE.UPDATED_SETTING)))
                return ctx.channel.send(Embed)
            }
            default: {
                Embed.setTitle(lingua[language].LOCALE.DEFAULT.LOCALIZATION)
                    .setDescription(
                        `**${lingua[language].LOCALE.DEFAULT.CURRENT}**\n\`${language}\`\n\n${replace(/PREFIX/gi, ctx.config.variables.prefix[0], lingua[language].LOCALE.DEFAULT.SUB)}`
                    )
                return ctx.channel.send(Embed)
            }
        }
    }
}