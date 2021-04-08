import Command from '../../handler/structures/Command';

export = class Info extends Command {
    constructor() {
        super({
            name: "info",
            description: "Show Information about the Bot",
            aliases: ["about"],
            // module: "General",
            cooldown: 0,
            guildOnly: false,
            dev: false
        })
    }

    async command(ctx: any) {
        return console.log("Information Command")
    }
}