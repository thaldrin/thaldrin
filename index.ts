import "./src/utils/patch"

// @ts-ignore
import { Discord } from "@modules/eu/src/index"
import path from "path"
import config from "@utils/config"
import { Intents } from "@modules/eu/src/misc/imports"


const Bot = new Discord.Client({
    // @ts-ignore
    token: config.tokens.discord,
    commands: path.join(__dirname, "src", "discord", "commands"),
    events: path.join(__dirname, "src", "discord", "events"),
    options: {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
        commandCategories: true,
        debug: true
    },

})