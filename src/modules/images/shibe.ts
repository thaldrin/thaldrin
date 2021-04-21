import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import { MessageEmbed } from 'discord.js';

export = class Shibe extends Command {
    constructor() {
        super({
            name: "shibe",
            description: "Show a Shibe",
            aliases: ["shib"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.shibe("shibes", 1)
        let provider = "shibe.online"
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