import { Context } from "../../utils/types";
import Command from "../../handler/structures/Command";
import clean from "../../utils/clean"
export = class Eval extends Command {
    constructor() {
        super({
            name: "eval",
            description: "Evaluate JS code directly from the process.",
            aliases: [
                'ev',
                'e'
            ],
            cooldown: 0,
            dev: true,
            guild: false
        })
    }

    async command(ctx: Context) {
        let code = ctx.args.join(" ")
        try {
            let evaled = await eval(code)
            if (typeof evaled != 'string') {
                evaled = (await import("util")).inspect(evaled, false, 1)
            }
            return ctx.channel.send(`\`\`\`js\n${clean(evaled)}\n\`\`\``)
        } catch (error) {
            console.error(error)
        }
    }
}