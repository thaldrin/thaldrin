// @ts-nocheck
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import lingua from '../../utils/lingua';
import replace from '../../utils/replace';
import { request } from '../../utils/command.roleplay';

export = class NSFW_Lick extends Command {
    constructor() {
        super({
            name: "nlick",
            description: "Hug someone lewdly!",
            cooldown: 1,
            nsfw: true
        })
    }

    async command(ctx: Context) {
        let action = "nsfw_lick"
        if (ctx.message.mentions.members?.size === 0) return ctx.channel.send(replace(/ACTION/g, action, lingua[ctx.settings.locale].RP_REQUIRE_MENTION))
        if (ctx.message.mentions.members?.first()?.id === ctx.client.user?.id) return ctx.channel.send(replace(/ACTION/g, action, lingua[ctx.settings.locale].RP_ME))
        if (ctx.message.mentions.members?.first()?.id === ctx.author.id) return ctx.channel.send(replace(/ACTION/g, action, lingua[ctx.settings.locale].RP_SELF))

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