import Command from "../../handler/structures/Command";

export = class Eval extends Command {
    constructor() {
        super({
            name: "Eval",
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

    async command(ctx: any) {
        let code = ctx.args.join(" ")
        try {
            let evaled = await eval(code)
            if (typeof evaled != 'string') {
                evaled = (await import("util")).inspect(evaled, false, 1)
            }
            return evaled
        } catch (error) {

        }
    }
}