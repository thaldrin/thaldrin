import yiff from "../../utils/yiff"
import Command from "../../handler/structures/Command"
import { Context } from "../../utils/types";
import { MessageEmbed } from "discord.js"
import embed from "../../utils/embed";
import lingua from "../../utils/lingua";
export = class E621 extends Command {
    constructor() {
        super({
            name: "e926",
            description: "Get an Image from E926",
            aliases: ['e9', 'enine'],
            cooldown: 1
        })
    }

    async command(ctx: Context) {
        // @ts-ignore
        if (ctx.args.length < 1) return ctx.channel.send(embed.setTitle(lingua[ctx.settings.locale].NOT_ENOUGH_TAGS).setDescription(lingua[ctx.settings.locale].NOT_ENOUGH_TAGS_DES))
        let request = await yiff.e926(ctx.args.join(" "))
        if (ctx.settings.embeds) {
            embed.setAuthor('e926.net', 'https://thaldrin.media/e621.png', `https://e926.net/post/${request[0].id}`)
                .setImage(request[0].file.url)
                .setDescription(`[Link](https://e926.net/post/${request[0].id})`)
            ctx.channel.send(embed)
        } else {
            ctx.channel.send(`<https://e926.net/post/${request[0].id}>\n\n${request[0].file.url}`)

        }
    }
}