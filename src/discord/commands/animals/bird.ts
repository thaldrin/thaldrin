import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Bird extends Command {
    constructor() {
        super({
            name: "bird",
            aliases: ["birb"],
            description: "Sends a random bird image",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("bird")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
