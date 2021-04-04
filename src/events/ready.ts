import config from "../../config"

export = {
    name: "ready",
    run: async (client: any) => {
        console.log(`${config.variables.name} has started.`)

    }
}