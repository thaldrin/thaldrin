import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "wolf",
            description: "Show a Wolf",
            aliases: ["awoo"],
            cooldown: 0,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.thaldrin("wolves")
        let provider = "thaldr.in"

        ctx.settings.embeds ?
            ctx.channel.send(new MessageEmbed().setImage(image.url).setFooter(`Thaldrin - Image provided by ${provider}`, ctx.config.variables.avatar).setColor(ctx.config.variables.color))
            :
            ctx.channel.send(image.url)
    }
}