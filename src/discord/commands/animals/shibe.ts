import yiff from '../../../utils/yiff';
import { Command } from '@thaldrin/eu';
import { Context } from '../../../utils/types';
import { MessageEmbed } from 'discord.js';
import request from '../../../utils/animals';

export = class Shibe extends Command {
    constructor() {
        super({
            name: "shibe",
            description: "Show a Shibe",
            aliases: ["shib"],
            cooldown: 2,
        })
    }

    async command(ctx: Context) {

        let { image, provider } = await request('shibe')

        if (ctx.settings.embeds) {
            let Shibe = new MessageEmbed()
                .setImage(image[0])
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Shibe)
        } else {

            ctx.channel.send(image[0])
        }
    }
}