import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"
import request from "@utils/animals"
import EmbeddingHandler from "@utils/Embed"

export = class Hyena extends Command {
    constructor() {
        super({
            name: "hyena",
            aliases: ["yeen"],
            description: "Sends a random yeen",
        })

    }

    async run(context: Context): Promise<any> {
        let data = await request("hyena")
        let Embed = new EmbeddingHandler(context, data)


        return Embed.get()
    }
}
