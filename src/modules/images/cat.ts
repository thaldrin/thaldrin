import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';

export = class Birb extends Command {
    constructor() {
        super({
            name: "birb",
            description: "Show a Birb",
            aliases: ["bird", 'birds'],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.shibe("birds", 1)
        let provider = "shibe.online"
        if (ctx.settings.embeds) {
            let Birb = new MessageEmbed()
                .setImage(image[0])
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Birb)
        } else {

            ctx.channel.send(image[0])
        }
    }
}