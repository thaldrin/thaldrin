// @ts-nocheck
import { Client, Collection, Message } from "discord.js";
import Logger from "../utils/logger";
import supabase from "../utils/database";
import { Server, Usage } from "../utils/types";

export = {
    name: "message",
    run: async (client: Client, message: Message) => {
        if (message.author.bot) return
        if (message.channel.type === "dm") return

        let { data: server_data, error: server_error } = await supabase.from<Server>("servers").select().eq(`server_id`, message.guild.id).limit(1)
        let { data: usage_data, error: usage_error } = await supabase.from<Usage>("usage").select().eq('name', "message")

        if (usage_data?.length === 0) {
            let { data: a, error: b } = await supabase.from<Usage>("usage").insert({ name: "message", type: "event" }).select()
            usage_data = a
        }

        let { data: updated_usage_data, error } = await supabase.from<Usage>('usage').update({ amount: usage_data[0].amount + 1 }).select().eq("name", "message")
        // console.log(message.guild?.name, server_data)
        console.log("usage log", usage_data)


    }
}