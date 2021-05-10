import yiff from "../../utils/yiff"
import Command from "../../handler/structures/Command"
import { Context } from "../../utils/types";
import { MessageEmbed } from "discord.js"
import lingua from "../../utils/lingua";
export = class E621 extends Command {
    constructor() {
        super({
            name: "e621",
            description: "Get an Image from E621",
            aliases: ['e6', 'esix'],
            cooldown: 2,
            nsfw: true
        })
    }

    async command(ctx: Context) {
        let embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        // @ts-ignore
        if (ctx.args.length < 1) return ctx.channel.send(embed.setTitle(lingua[ctx.settings.locale].NOT_ENOUGH_TAGS).setDescription(lingua[ctx.settings.locale].NOT_ENOUGH_TAGS_DES))
        let request = await yiff.e621(ctx.args.join(" "))
        if (ctx.settings.embeds) {
            embed.setAuthor('e621.net', 'https://thaldrin.media/e621.png', `https://e621.net/post/${request[0].id}`)
                .setImage(request[0].file.url)
                .setDescription(`[Link](https://e621.net/post/${request[0].id})`)
            ctx.channel.send(embed)
        } else {
            ctx.channel.send(`<https://e621.net/post/${request[0].id}>\n\n${request[0].file.url}`)

        }
    }
}