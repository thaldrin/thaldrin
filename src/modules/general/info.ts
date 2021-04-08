import { Context } from '../../utils/types';
import Command from '../../handler/structures/Command';

export = class Info extends Command {
    constructor() {
        super({
            name: "info",
            description: "Show Information about the Bot",
            aliases: ["about"],
            // module: "General",
            cooldown: 0,
            AuthorPermissions: ["MANAGE_GUILD"],
            dev: false
        })
    }

    async command(ctx: Context) {
        return console.log("Information Command")
    }
}