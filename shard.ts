import { ShardingManager } from "discord.js";
import config from "./config";
let Sharder = new ShardingManager('./build/index.js', {
    token: config.token,
    totalShards: "auto"
})

Sharder.on("shardCreate", async (shard) => {
    console.log(`Launched Shard #${shard.id}`)
})

Sharder.spawn()