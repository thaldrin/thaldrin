import Logger from "../utils/logger"
import { Guild } from "discord.js"
// import Prom from "../utils/init.prometheus";
export = {
    name: "guildDelete",
    // @ts-ignore
    run: async (client, guild: Guild) => {
        // Prom.guildCount.dec()
        // Prom.totalGuilds.set(client.guilds.cache.size)
        Logger.info({
            type: "event:guildDelete",
            message: `Left Guild: ${guild.name} [${guild.id}]`
        })

    }
}