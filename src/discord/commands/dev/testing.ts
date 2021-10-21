import { Context } from "@utils/types"
import { Command } from "@modules/eu/src/index"

export = class TestingCommand extends Command {
    constructor() {
        super({
            name: "testing",
            aliases: ["t"],
        })
        // console.log(this)
    }

    async run(context: Context): Promise<any> {
        // console.log(context)
        // console.log(this.nsfw)
        console.log("testing")
        return "Generic command"
    }
}
