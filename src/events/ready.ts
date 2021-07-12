import Logger from "../utils/logger"
import config from "../../config"
// import prom from "../utils/init.prometheus"
export = {
    name: "ready",
    // @ts-ignore
    run: async (client: any) => {
        // prom.totalGuilds.set(client.guilds.cache.size)
        Logger.info({
            type: "event:ready",
            message: `${config.variables.name} has started`
        })

    }
}