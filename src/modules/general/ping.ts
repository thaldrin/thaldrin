import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import SendWS from "../../utils/webhook";
import lingua from '../../utils/lingua';
import { suggest } from '../../utils/trello';
export = class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            description: "See the Bot's Ping",
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        const ping = await ctx.channel.send("Pinging...")
        const rest = Math.round(ping.createdTimestamp - ctx.message.createdTimestamp)
        const ws = Math.round(ctx.client.ws.ping)
        // @ts-ignore
        const shard = Math.round(ctx.guild?.shard.ping)
        // @ts-ignore
        return ping.edit(`**Rest** = ${rest / 1000}s (\`${rest}ms\`)\n**WS** = ${ws / 1000}s (\`${ws}ms\`)\n**Shard #${ctx.guild?.shard.id + 1}** = ${shard / 1000}s (\`${shard}ms\`)
        `)
    }
}