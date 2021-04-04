//@ts-ignore
import config from "./config";
import client from "./src/handler/client/Client"
import { Util } from "discord.js";
Util.fetchRecommendedShards(config.token).then((count) => {
    console.log(`Starting ${config.variables.name}`)
    new client(config, count)
})