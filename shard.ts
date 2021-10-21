import "./src/utils/patch"


import { Discord } from "@modules/eu/src/index"
import config from "@utils/config"

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