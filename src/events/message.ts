// @ts-nocheck
import { Client, Collection, Message } from "discord.js";
import Logger from "../utils/logger";
import supabase from "../utils/database";
import { Server, Usage } from "../utils/types";
import config from "../../config";
import { Commands, Shortlink, SourceFinder } from "../utils/wrapper.features";
import lingua from "../utils/lingua";
import replace from "../utils/replace";

export = {
    name: "message",
    run: async (client: Client, message: Message) => {
        if (message.author.bot) return
        if (message.channel.type === "dm") return

        // ! Messages seen 
        let { data: usage_data, error: usage_error } = await supabase.from<Usage>("usage").select().eq('name', "message")
        if (usage_data?.length === 0) {
            let { data: a, error: b } = await supabase.from<Usage>("usage").insert({ name: "message", type: "event" }).select()
            usage_data = a
        }
        let { data: updated_usage_data, error } = await supabase.from<Usage>('usage').update({ amount: usage_data[0].amount + 1 }).select().eq("name", "message")
        // ! Messages seen


        // ? Check if Server exists in DB
        let { data: check_data, error: check_error } = await supabase.from<Server>("servers").select().eq(`server_id`, message.guild.id).limit(1)
        if (check_data?.length === 0) {
            let { data: c, error: d } = await supabase.from<Server>('servers').insert({
                server_id: message.guild?.id
            })
        }
        // ? Get Server Config
        let { data: server_data, error: server_error } = await supabase.from<Server>("servers").select().eq(`server_id`, message.guild.id).limit(1)

        // ? Check if Message includes Shortlinks
        await Shortlink(message, server_data[0].shortlinks)
        // ? Check if Message includes E621 Image Links
        await SourceFinder(message, server_data[0].sourcefinder)
        // ? Check if Channel Topic allows Commands
        if (await Commands(message)) return;

        // ! Prefix
        let PrefixArray: string[] = [...config.variables.prefix, [(server_data[0].prefix ? server_data[0].prefix : [])]].flat(Infinity)

        let Prefix: string
        let Exists: boolean
        for (const p in PrefixArray) {
            if (message.content.startsWith(PrefixArray[p])) {
                Prefix = p
                Exists = true
            }
        }
        // ! If Prefix doesn't exist in Message Content, return
        if (!Exists) return;
        const args = message.content.slice(PrefixArray[Prefix].length).trim().split(/ +/g)
        const command = args.shift()?.toLowerCase()

        const cmd = client.commands.find((c) => (c.name as string).toLowerCase() == command || (c.aliases && c.aliases.includes(command)))
        if (!cmd) return;

        if (!client.cooldowns.has(cmd.name)) {
            client.cooldowns.set(cmd.name, new Collection())
        }

        const ctx = {
            client,
            guild: message.guild,
            message, channel: message.channel,
            author: message.author,
            member: message.member,
            supabase,
            guildSettings: server_data[0],
            config,
            isDeveloper: config.developers.find(dev => dev.id === message.author.id)
        }
        // ! Override Command Restrictions if Message Author is on list of Developers
        // if (ctx.isDeveloper) cmd.AuthorPermissions = "NONE"

        // ! If Command is NSFW and channel is not marked as such, return
        if (cmd.nsfw && !ctx.channel.nsfw) return ctx.channel.send(
            lingua[server_data[0].locale].CHANNEL_NOT_NSFW
        )

        if (cmd.AuthorPermissions !== "NONE" && ctx.member?.permissions.has(cmd.AuthorPermissions)) return ctx.channel.send(replace(/PERMISSIONS/gm, cmd.AuthorPermissions.join(", "), lingua["en_US"].INSUFFICIENT_PERMISSIONS))

    }
}