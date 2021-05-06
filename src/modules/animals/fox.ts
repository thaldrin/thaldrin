import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';

export = class Fox extends Command {
    constructor() {
        super({
            name: "fox",
            description: "Show a Fox",
            aliases: ["yip"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.thaldrin("foxes")
        let provider = "thaldr.in"

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