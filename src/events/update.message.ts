import { Client, Message } from "discord.js";
import Logger from "../utils/logger";


export = {
    name: "messageUpdate",
    run: async (client: Client, old_message: Message, new_message: Message) => {
        if (new_message.author.bot || old_message.author.bot) return

        if (old_message.content === new_message.content) return;

//         Logger.info({ type: `event:messageUpdate`, message: "Emitting new message to event:message" })
        await client.emit("message", new_message)

    }
}
