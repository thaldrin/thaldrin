import { Client, Collection, Message } from "discord.js";
import Logger from "../utils/logger";
import supabase from "../utils/database";
import { Server } from "../utils/types";

export = {
    name: "message",
    run: async (client: Client, message: Message) => {
        if (message.author.bot) return
        if (message.channel.type === "dm") return
        // @ts-ignore
        let { data, error } = await supabase.from<Server>("servers").select().eq(`server_id`, message.guild.id)
        if (data?.length === 0) await supabase.from<Server>("servers").insert({
            server_id: message.guild?.id
        })

        Logger.info({
            type: `event:command`,
            command: "Test",
            message: ` `,
        })

        // console.log(message.guild?.name, data)
    }
}