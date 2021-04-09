import Command from '../../handler/structures/Command';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "wolf",
            description: "Show a Wolf",
            aliases: ["awoo"],
            cooldown: 0,
        })
    }

    async command(ctx: any) {
        return console.log("Wolf Command")
    }
}