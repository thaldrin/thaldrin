import { Command } from '@thaldrin/eu';
import { Context } from "../../../utils/types";
import lingua from "../../../utils/lingua";
import replace from "../../../utils/replace";
import { MessageEmbed } from "discord.js";

let perks = [
    "Donator Role + Custom color role in Discord Server",
    "Reduced Cooldowns for commands",
    "API Access",
    'Shortlink creation on [t8.pm](https://t8.pm)'
]
export = class Donate extends Command {
    constructor() {
        super({
            name: "donate",
            description: "See ways to support Thaldrin's Development",
            cooldown: 1,
        });
    }


    async command(ctx: Context) {
        let embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        embed.setTitle("Donate").setURL("https://lio.cat/support")
            .setDescription(`If you enjoy Thaldrin and his Services you can donate to help support the Developer and fund future features.`)
            .addField("One-Time", `- [Kofi](https://ko-fi.com/hokkqi)\n- [XTZ](https://tzkt.io/tz1eCwUvawQ3p2hDDdzsg3e7B1tyU3M3F1Va/) \`tz1eCwUvawQ3p2hDDdzsg3e7B1tyU3M3F1Va\`\n- [ETH](https://etherscan.io/address/0x8BC37013964dc2910a9a5C728eC8d586C7d6e1f2)\`0x8BC37013964dc2910a9a5C728eC8d586C7d6e1f2\`\n\nmessage [lion.himbo.cat](https://lion.himbo.cat) for other ways if needed :sparkles:`)
            .addField("Monthly", `- [Buy me a Coffee](https://kji.tf/bmac)\n- [Patreon](https://patreon.com/thaldrin)\n`)
            .addField("Donator Perks", `- ${perks.join('\n- ')}`)

        ctx.channel.send(embed)
    };
}
