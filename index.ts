//@ts-ignore
import config from "./config";
import client from "./src/handler/client/Client"
import { Util } from "discord.js";
import Logger from "./src/utils/logger";
Util.fetchRecommendedShards(config.token).then((count) => {
    // console.log(`Starting ${config.variables.name}`)
    Logger.info({
        message: `Starting ${config.variables.name} with ${count} Shards`,
        type: "event:start"
    })
    new client(config, count)
})
