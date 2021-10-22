import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import { MessageEmbed } from "discord.js"

export = class Cat extends Command {
    constructor() {
        super({
            name: "cat",
            description: "Sends a random cat image",
        })

    }

    async run(context: Context): Promise<any> {
        let { image, provider } = await request("cat")
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
