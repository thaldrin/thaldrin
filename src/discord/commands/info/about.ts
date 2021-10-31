import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import { MessageEmbed } from "discord.js"
import gitVersion from "@utils/gitVersion"

export = class about extends Command {
    constructor() {
        super({
            name: "about",
            aliases: ["info"],
            description: "Information about Thaldrin",
        })

    }

    async run(context: Context): Promise<any> {
        let devs: string[] = []
        let contributors: string[] = []
        if (context.config.devs.length > 1) {
            context.config.devs.forEach(dev => {
                devs.push(`\n **[${dev.nick}](${dev.link})**`)
            })
            devs.join("")
        } else {
            context.config.devs.forEach(dev => {
                devs.push(`**[${dev.nick}](${dev.link})**`)
            })
            devs.join("")
        }
        if (context.config.contibutors.length > 1) {
            context.config.contibutors.forEach(con => {
                contributors.push(`\n **[${con.nick}](${con.link})** - ${con.reason}`)
            })
            contributors.join(" ")
        } else {
            context.config.contibutors.forEach(con => {
                contributors.push(`**[${con.nick}](${con.link})** - ${con.reason}`)
            })
            contributors.join(" ")
        }

        let Embed = new MessageEmbed()
            .setDescription(`
        Made by ${devs}\nA [Temere](https://teme.re) Project\nSupport Thaldrin by [donating](https://lio.cash)
        `)
            .addField("Contributors", `${contributors}`, false)
            .addField("Source", "[t8.pm/source](https://t8.pm/source)", true)
            .addField("Support Server", `[${context.Eu.guilds.cache.get("828978320279863306").name}](https://t8.pm/support)`, true)
            .addField("Website", "[thaldr.in](https://thaldr.in)", true)
            .setColor("ORANGE")
            .setFooter(`Thaldrin v5 - ${gitVersion}`, "https://thaldrin.media/avatar.png")

        return context.channel.send({ embeds: [Embed] })
    }
}
