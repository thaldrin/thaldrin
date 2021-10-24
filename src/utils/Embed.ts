import { MessageEmbed } from "discord.js";
import { Server, Context } from "@utils/types"

export default class EmbeddingHandler {
    context: Context
    image: string
    provider: string
    line?: string
    constructor(context, data) {
        this.context = context
        this.image = [data.image].flat()[0]
        this.provider = data.provider
        this.line = data?.line


    }

    get() {
        if (this.context.settings.embeds) {
            let Embed = new MessageEmbed()
                // @ts-ignore
                .setImage(this.image)
                .setFooter(`Thaldrin - Image provided by ${this.provider}`, "https://thaldrin.media/avatar.png")
                .setColor("ORANGE")
            if ((this.line && this.context.message.mentions.members.size !== 0) && this.context.settings.embeds) Embed.setDescription(`${this.line}`)
            return this.context.channel.send({ embeds: [Embed] })
        }
        else {
            if ((this.line && this.context.message.mentions.members.size !== 0) && this.context.settings.embeds) return this.context.channel.send(`${this.line}\n\n${this.image}`)
            return this.context.channel.send(`${this.line}\n\n${this.image}`)
        }
    }
}