import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';
import request from '../../utils/animals';

export = class Cat extends Command {
    constructor() {
        super({
            name: "cat",
            description: "Show a Cat",
            aliases: ["mow", 'meow'],
            cooldown: 2,
        })
    }

    async command(ctx: Context) {
        let { image, provider } = await request('shibe')

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