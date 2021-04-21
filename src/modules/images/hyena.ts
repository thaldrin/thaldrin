import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';

export = class Hyena extends Command {
    constructor() {
        super({
            name: "hyena",
            description: "Show a Hyena",
            aliases: ["yeen"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.thaldrin("yeens")
        let provider = "thaldr.in"

        if (ctx.settings.embeds) {
            let Hyena = new MessageEmbed()
                .setImage(image.url)
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Hyena)
        } else {

            ctx.channel.send(image.url)
        }
    }
}