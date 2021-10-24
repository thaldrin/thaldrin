import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import { request } from "@utils/command.roleplay"
import EmbeddingHandler from "@utils/Embed"

export = class Cuddle extends Command {
    constructor() {
        super({
            name: "cuddle",
            description: "Cuddle a fellow fur!",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("cuddle", context.settings.locale)
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
