import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import { MessageEmbed } from "discord.js"

export = class Hyena extends Command {
    constructor() {
        super({
            name: "hyena",
            aliases: ["yeen"],
            description: "Sends a random yeen",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("hyena")

        if (context.settings.embeds) {
            let Embed = new MessageEmbed()
                .setImage(data.image.url)
                .setFooter(`Thaldrin - Image provided by ${data.provider}`, "https://thaldrin.media/avatar.png")
                .setColor("ORANGE")

            context.channel.send({ embeds: [Embed] })
        }
        else {
            context.channel.send(data.image.url)
        }
    }
}
