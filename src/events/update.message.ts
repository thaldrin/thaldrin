import { Client, Message } from "discord.js";
import Logger from "../utils/logger";


export = {
    name: "messageUpdate",
    run: async (client: Client, old_message: Message, new_message: Message) => {
        Logger.info({ type: `event:messageUpdate`, message: "Emitting new message to event:message" })
        await client.emit("message", new_message)

    }
}