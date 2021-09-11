// @ts-nocheck
import { Command } from '@thaldrin/eu';
import { Context, Server } from '../../../utils/types';
import database from "../../../utils/database"
import path from 'path'
import langs from '../../../utils/language';
import { MessageEmbed } from 'discord.js';
import replace from '../../../utils/replace';
import fs from 'fs'
import path from 'path'

function enabled(a: boolean, lang: string) {
    // @ts-ignore
    return a ? lingua[lang].MISC.ENABLED : lingua[lang].MISC.DISABLED
}
function user(ctx: Context, id: string) {
    let x = ctx.client.users.cache.get(id)
    return x
}

function listFiles(dir: string) {
    let files = fs.readdirSync(dir)
    let list = []
    for (let i = 0; i < files.length; i++) {
        let name = path.join(dir, files[i])
        let isDirectory = fs.statSync(name).isDirectory()
        list.push({ name, isDirectory })
    }
    return list
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
        let validLangs = langs.langs()
        const Embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        switch (sub) {
            case "list": {
                let alllangs = langs.langs().map(x => (`${replace(/LANGUAGE/gi, `**${langs.get(x).meta.name} (${langs.get(x).meta.locale})**`, replace(/TRANSLATOR/gi, `**${user(ctx, langs.get(language).meta.translators[0]).tag}**`, `${langs.get(language).locale.title}`))}\n${replace(/AMOUNT/gi, langs.get(x).meta.translators.length, langs.get(x).locale.translators)}\n\`${ctx.config.variables.prefix[0]} locale set ${langs.get(x).meta.locale}\``))
                let topdesc = replace(/BOT/gi, ctx.config.variables.name, replace(/AMOUNT/gi, validLangs.length, replace(/PREFIX/gi, ctx.config.variables.prefix[0], langs.get(language).locale.amount)))
                Embed.setTitle(langs.get(language).locale.language).setDescription(`${topdesc}\n\n${alllangs.join(`\n\n`)}`)
                return ctx.channel.send(Embed)
            }
            case "set": {
                console.log(validLangs)
                if (ctx.args === [] || ctx.args.join(' ').trim() === '') return ctx.channel.send(langs.get(language).missing.values.country);
                if (!validLangs.includes(ctx.args[0])) return ctx.channel.send(replace(/BOT/gi, ctx.config.variables.name, replace(/VALUE/gi, ctx.args.join(" "), langs.get(language).locale.unsupported)))

                let { data, error } = await database.from<Server>('servers').update({ locale: ctx.args[0] }).match({ server_id: ctx.guild?.id })
                if (error) throw new Error(error)
                Embed.setTitle(replace(/SETTING/gi, lingua[ctx.args[0]].LOCALE.DEFAULT.LANGUAGE, replace(/VALUE/gi, ctx.args[0], langs.get(language).locale.updated)))
                return ctx.channel.send(Embed)
            }
            default: {
                Embed.setTitle(langs.get(language).locale.language)
                    .setDescription(
                        `**${langs.get(language).locale.current}**\n\`${language}\`\n\n${replace(/PREFIX/gi, ctx.config.variables.prefix[0], langs.get(language).locale.sub)}`
                    )
                return ctx.channel.send(Embed)
            }
        }
    }
}