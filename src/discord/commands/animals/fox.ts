import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Fox extends Command {
    constructor() {
        super({
            name: "fox",
            description: "Sends a random fox image",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("fox")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
