import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Cat extends Command {
    constructor() {
        super({
            name: "cat",
            description: "Sends a random cat image",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("cat")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
