//@ts-ignore
import config from "./config";
import { Discord } from "@thaldrin/eu"
import { Intents } from "discord.js";
import { join } from 'path'


let Bot = new Discord.Client({
    // @ts-ignore
    token: config.discord?.token,
    commands: join(__dirname, "src", "discord", 'commands'),
    events: join(__dirname, "src", "discord", 'events'),
    options: {
        commandCategories: true,
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    }
})
