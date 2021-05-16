import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import request from '../../utils/animals';

export = class Fox extends Command {
    constructor() {
        super({
            name: "fox",
            description: "Show a Fox",
            aliases: ["yip"],
            cooldown: 2,
        })
    }

    async command(ctx: Context) {
        let { image, provider } = await request('fox')


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