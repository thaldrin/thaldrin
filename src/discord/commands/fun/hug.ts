import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import { request } from "@utils/command.roleplay"
import EmbeddingHandler from "@utils/Embed"

export = class Hug extends Command {
    constructor() {
        super({
            name: "hug",
            description: "Hug a fellow fur!",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("hug", context.settings.locale)
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
