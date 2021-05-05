import Command from '../../handler/structures/Command';
import { Context, Usage } from '../../utils/types';
import lingua from '../../utils/lingua';
import embed from '../../utils/embed';
import CommandUsage from '../../utils/command.usage';

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
        console.log(Stats)

    }
}