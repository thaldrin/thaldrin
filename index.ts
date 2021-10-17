import { Discord } from "./src/modules/eu/src/index"
import path from "path"
import config from "./src/utils/config"
import { Intents } from "./src/modules/eu/src/misc/imports"
// @ts-ignore
import modulus from "./src/utils/modulus"


const Bot = new Discord.Client({
    // @ts-ignore
    token: config.tokens.discord,
    commands: path.join(__dirname, "src", "discord", "commands"),
    events: path.join(__dirname, "src", "discord", "events"),
    options: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
    }
})