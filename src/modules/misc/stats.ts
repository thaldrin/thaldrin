import Command from '../../handler/structures/Command';
import { Context, Usage } from '../../utils/types';
import lingua from '../../utils/lingua';
import embed from '../../utils/embed';
import CommandUsage from '../../utils/command.usage';
import vega from "vega"

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
        let Stats = await CommandUsage(ctx.client.commands)
        // @ts-ignore
        let View = new vega.View(vega.parse(Stats), { renderer: "none" })
        let Canvas = await View.toCanvas()
        // return ctx.channel.send(Stats.join("\n"))
        // @ts-ignore
        let Image = View.createPNGStream()
        // @ts-ignore
        let Buffer = Image.toBuffer()
        console.log(Buffer)

    }
}