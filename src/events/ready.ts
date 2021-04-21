import Logger from "../utils/logger"
import config from "../../config"

export = {
    name: "ready",
    // @ts-ignore
    run: async (client: any) => {
        Logger.info({
            type: "event:ready",
            message: `${config.variables.name} has started`
        })

    }
}