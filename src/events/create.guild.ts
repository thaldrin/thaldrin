import Logger from "../utils/logger"
import config from "../../config"
import { Guild } from "discord.js"

export = {
    name: "guildCreate",
    // @ts-ignore
    run: async (client, guild: Guild) => {
        console.log(guild)
        Logger.info({
            type: "event:guildCreate",
            message: `New Guild: ${guild.name} [${guild.id}]`
        })

    }
}