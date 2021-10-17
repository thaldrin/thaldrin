require("module-alias/register")

import { Discord } from "./src/modules/eu/src/index"
import config from "./src/utils/config"

let Sharder = new Discord.ShardingManager('./build/index.js',
    {
        // @ts-ignore
        token: config.tokens.discord,
        respawn: true,
        totalShards: "auto"
    })


Sharder.on("shardCreate", async (shard) => {
    console.log(`Launched Shard #${shard.id}`)
})

Sharder.spawn()