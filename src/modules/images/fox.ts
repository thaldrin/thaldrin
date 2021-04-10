import { Context } from '../../utils/types';
import Command from '../../handler/structures/Command';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "fox",
            description: "Show a Fox",
            aliases: ["yip"],
            cooldown: 0,
        })
    }

    async command(ctx: Context) {
        // await find('foxes')
        return console.log("Fox Command")
    }
}