import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import { MessageEmbed } from "discord.js"

export = class Bird extends Command {
    constructor() {
        super({
            name: "bird",
            aliases: ["birb"],
            description: "Sends a random bird image",
        })

    }

    async run(context: Context): Promise<any> {
        let { image, provider } = await request("bird")
        // console.log({ image, provider })
        if (context.settings.embeds) {
            let Embed = new MessageEmbed()
                .setImage(image[0])
                .setFooter(`Thaldrin - Image provided by ${provider}`, "https://thaldrin.media/avatar.png")
                .setColor("ORANGE")

            context.channel.send({ embeds: [Embed] })
        }
        else {
            context.channel.send(image[0])
        }
    }
}
