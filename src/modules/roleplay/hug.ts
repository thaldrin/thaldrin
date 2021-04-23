import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import lingua from './../../utils/lingua';
import replace from './../../utils/replace';

export = class Fox extends Command {
    constructor() {
        super({
            name: "hug",
            description: "Hug somebody!",
            // aliases: ["yip"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.sheri("hug")
        let provider = "sheri.bot"
        // @ts-ignore
        if (ctx.message.mentions.members?.size === 0) return ctx.channel.send(replace(/ACTION/g, 'hug', lingua[ctx.settings.locale].RP_REQUIRE_MENTION))
        // @ts-ignore
        if (ctx.message.mentions.members?.first()?.id === ctx.client.user?.id) return ctx.channel.send(replace(/ACTION/g, 'hug', lingua[ctx.settings.locale].RP_ME))
        // @ts-ignore
        if (ctx.message.mentions.members?.first()?.id === ctx.author.id) return ctx.channel.send(replace(/ACTION/g, 'hug', lingua[ctx.settings.locale].RP_SELF))

        if (ctx.settings.embeds) {
            let Fox = new MessageEmbed()
                .setImage(image.url)
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Fox)
        } else {

            ctx.channel.send(image.url)
        }
    }
}