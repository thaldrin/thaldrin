import Command from "../../handler/structures/Command";
import { exec } from "child_process";
import { Context } from "../../utils/types";

export = class Exec extends Command {
    constructor() {
        super({
            name: "exec",
            description: "Execute Shell Commands",
            aliases: [
                'sh',
                'ex'
            ],
            cooldown: 0,
            dev: true,
        })
    }

    async command(ctx: Context) {
        await ctx.channel.send(`Executing \`${ctx.args.join(' ')}\`...`).then(async (message) => {

            exec(`${ctx.args.join(' ')}`, async (error, stdout, stderr) => {
                await ctx.channel.send(("```bash\n" + stdout + "```"), { split: true })
                await message.delete()
                if (stderr) return ctx.channel.send("stderr:\n```bash\n" + stderr + "```")
                if (error !== null) {
                    return ctx.channel.send("error:\n```bash\n" + error + "```")
                }
            })
        })
    }
}