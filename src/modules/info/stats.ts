import Command from '../../handler/structures/Command';
import { Context, Usage } from '../../utils/types';
// import lingua from '../../utils/lingua';
import { MessageEmbed } from 'discord.js';
import CommandUsage from '../../utils/command.usage';
import { commitHash } from "../../utils/git"

function uptime(ms: number) {
    function pad(s: number) {
        return (s < 10 ? '0' : '') + s;
    }
    var days = Math.floor(ms / (24 * ((60 * 60))));
    var hours = Math.floor(ms / (60 * 60));
    var minutes = Math.floor((ms % (60 * 60)) / 60);
    var seconds = Math.floor(ms % 60);
    return `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
    // return pad(hours) + 'h ' + pad(minutes) + 'm ' + pad(seconds) + 's';
}

export = class Stats extends Command {
    constructor() {
        super({
            name: "stats",
            description: "See the Bot's Stats",
            aliases: ["statistics"],
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        // @ts-ignore
        const guilds = (await ctx.client.shard?.fetchClientValues(`guilds.cache.size`)).reduce((a, b) => a + b, 0)
        const shards = ctx.client.shard?.count
        const users = (await ctx.client.shard?.fetchClientValues(`users.cache.size`))?.reduce((a, b) => a + b, 0)

        let MiscValues = [
            `Uptime: **${uptime(process.uptime())}**`,
            `Guilds: **${guilds}**`,
            `Shards: **${shards}**`,
            `Users: **${users}**`
        ]

        let embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name} v${ctx.config.pkg.version} [${commitHash}]`, ctx.config.variables.avatar)
            .setTitle(`Statistics`)
            .setDescription(MiscValues.map((value) => `${value}`))
        // .addField(`Misc`, )


        ctx.channel.send(embed)
    }
}