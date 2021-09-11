import { Command } from '@thaldrin/eu';
import { Context } from '../../../utils/types';
import language from '../../../utils/language';
import { Guild, GuildMember, MessageEmbed, User as DiscordUser } from 'discord.js';
import replace from '../../../utils/replace';

let MentionRegex = /^<@!?(\d+)>$/gi

export = class User extends Command {
    constructor() {
        super({
            name: "user",
            description: "Get Information about a User",
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let USER: GuildMember

        let Person = ctx.args[0] ?? ""
        ctx.args.shift()

        let Mentioned = Person.match(MentionRegex)

        // @ts-ignore
        if (!Mentioned && Person === "") USER = { user: ctx.author }
        // @ts-ignore
        else if (!Mentioned && Person !== "") USER = ctx.guild?.members.cache.find(member => member.user.username.toLowerCase().includes(Person.toLowerCase()))
        // @ts-ignore
        else if (Mentioned) USER = ctx.message.mentions.members?.first()

        const Embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)

        // @ts-ignore
        // console.log()

        Embed
            // @ts-ignore
            .setTitle(replace(/USER/gi, USER?.nickname || USER.user.username, language.get(ctx.settings.locale).user.info))
            // @ts-ignore
            .addField(language.get(ctx.settings.locale).user.username, USER?.user.tag, true)
            // @ts-ignore
            .addField(language.get(ctx.settings.locale).user.id, USER?.user.id, true)
        // @ts-ignore
        console.log(USER)
        // let Roles = USER?.roles.cache.map(role => (`<@${role.id}>`))
        // @ts-ignore
        Embed
            //.addField(lingua[ctx.settings.locale].USER_INFO.ROLES, [Roles].join(", "), false)
            // @ts-ignore
            .addField(language.get(ctx.settings.locale).user.created, USER?.user.createdAt.toString(), false)
            // @ts-ignore
            .addField(language.get(ctx.settings.locale).user.joined, USER?.joinedAt?.toString(), true)

            // @ts-ignore
            .setThumbnail(USER?.user.avatarURL({ format: "png" }))



        ctx.channel.send(Embed)

    }
}