// @ts-nocheck
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import language from '../../utils/language';
import replace from '../../utils/replace';
import { request } from '../../utils/command.roleplay';

export = class NSFW_Hug extends Command {
    constructor() {
        super({
            name: "nhug",
            description: "Hug someone lewdly!",
            cooldown: 1,
            nsfw: true,
            usage: `<@User>`
        })
    }

    async command(ctx: Context) {
        let action = "nsfw_hug"
        if (ctx.message.mentions.members?.size === 0) return ctx.channel.send(replace(/ACTION/g, action, language.get(ctx.settings.locale).missing.mention))
        if (ctx.message.mentions.members?.first()?.id === ctx.client.user?.id) return ctx.channel.send(replace(/ACTION/g, action, language.get(ctx.settings.locale).rp.client))
        if (ctx.message.mentions.members?.first()?.id === ctx.author.id) return ctx.channel.send(replace(/ACTION/g, action, language.get(ctx.settings.locale).rp.self))

        let users = [ctx.message.author.username, ctx.message.mentions.members?.first()?.user.username]
        let { image, provider, line } = await request(action, ctx.settings.locale, users)
        if (ctx.settings.embeds) {
            let Action = new MessageEmbed().setImage(image.url)
            if ((line && ctx.message.mentions.members?.size !== 0) && ctx.settings.interactiontext) Action.setDescription(line)

            Action
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Action)
        } else {
            if ((line && ctx.message.mentions.members?.size !== 0) && ctx.settings.interactiontext) ctx.channel.send(`${line}\n\n${image.url}`)
            else ctx.channel.send(image.url)
        }
    }
}