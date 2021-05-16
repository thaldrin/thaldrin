import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import request from '../../utils/animals';

export = class Birb extends Command {
    constructor() {
        super({
            name: "bird",
            description: "Show a Bird",
            aliases: ["birbs", "birb", "birds"],
            cooldown: 2,
        })
    }

    async command(ctx: Context) {
        let { image, provider } = await request('bird')
        if (ctx.settings.embeds) {
            let Cat = new MessageEmbed()
                .setImage(image[0])
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Cat)
        } else {

            ctx.channel.send(image[0])
        }
    }
}