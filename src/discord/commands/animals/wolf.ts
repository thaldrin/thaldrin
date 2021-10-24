import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Wolf extends Command {
    constructor() {
        super({
            name: "wolf",
            description: "Sends a random Wolf image",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("wolf")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
