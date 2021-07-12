import Logger from "../utils/logger"
import config from "../../config"
import { Guild } from "discord.js"
// import Prom from "../utils/init.prometheus";
export = {
    name: "guildCreate",
    // @ts-ignore
    run: async (client, guild: Guild) => {
        // Prom.guildCount.inc()
        // Prom.totalGuilds.set(client.guilds.cache.size)
        Logger.info({
            type: "event:guildCreate",
            message: `New Guild: ${guild.name} [${guild.id}]`
        })

    }
}