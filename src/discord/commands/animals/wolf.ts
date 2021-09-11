import yiff from '../../../utils/yiff';
import { Command } from '@thaldrin/eu';
import { Context } from '../../../utils/types';
import { MessageEmbed } from 'discord.js';
import request from '../../../utils/animals';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "wolf",
            description: "Show a Wolf",
            aliases: ["awoo"],
            cooldown: 2,
        })
    }

    async command(ctx: Context) {
        let { image, provider } = await request('wolf')

        if (ctx.settings.embeds) {
            let Wolf = new MessageEmbed()
                .setImage(image.url)
                .setFooter(`${ctx.config.variables.name} - Image provided by ${provider}`, ctx.config.variables.avatar)
                .setColor(ctx.config.variables.color)

            ctx.channel.send(Wolf)
        } else {

            ctx.channel.send(image.url)
        }
    }
}