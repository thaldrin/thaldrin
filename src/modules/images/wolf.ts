import Command from '../../handler/structures/Command';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "Wolf",
            description: "Show a Wolf",
            aliases: ["awoo"],
            // module: "General",
            cooldown: 0,
            guildOnly: false,
            dev: false
        })
    }

    async command(ctx: any) {
        return console.log("Wolf Command")
    }
}