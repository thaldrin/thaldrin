import yiff from '../../utils/yiff';
import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';

export = class Wolf extends Command {
    constructor() {
        super({
            name: "wolf",
            description: "Show a Wolf",
            aliases: ["awoo"],
            cooldown: 0,
        })
    }

    async command(ctx: Context) {
        let image = await yiff.yiffy('animals', "wolf")
        console.log(image)
    }
}