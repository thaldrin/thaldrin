import { ShardingManager } from "discord.js";
import config from "./config";
import figlet from "figlet"
let Sharder = new ShardingManager('./build/index.js', {
    token: config.token,
    totalShards: "auto"
})
import chalk from "chalk"
import Logger from "./src/utils/logger";

if (!config.pkg.version.includes('dev')) figlet.text("caecus", { font: "Delta Corps Priest 1" }, (error, result) => { console.log(`${chalk.hex("#DEADED")`${result}`}\n${chalk.cyan`Thaldrin`} ${chalk.redBright`v${config.pkg.version}`}`) })


Sharder.on("shardCreate", async (shard) => {
    Logger.info({
        type: "event:shardCreate",
        // event: "shardCreate",
        message: `Launched Shard #${shard.id}`
    })
})

Sharder.spawn()