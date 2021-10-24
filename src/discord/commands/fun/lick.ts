import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import { request } from "@utils/command.roleplay"
import EmbeddingHandler from "@utils/Embed"

export = class Lick extends Command {
    constructor() {
        super({
            name: "lick",
            description: "Lick someone!",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("lick", context.settings.locale)
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
