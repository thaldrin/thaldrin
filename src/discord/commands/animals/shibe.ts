import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Shibe extends Command {
    constructor() {
        super({
            name: "shibe",
            description: "Sends a random shibe",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("shibe")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
