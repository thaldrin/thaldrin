// @ts-nocheck
import { Client, Collection, Message, MessageEmbed } from "discord.js";
import Logger from "../utils/logger";
import supabase from "../utils/database";
import { Command, Server, Usage } from "../utils/types";
import config from "../../config";
import { Commands, Shortlink, SourceFinder } from "../utils/wrapper.features";
import lingua from "../utils/lingua";
import replace from "../utils/replace";
import chalk from "chalk";
import Prom from "../utils/init.prometheus";


export = {
    name: "message",
    run: async (client: Client, message: Message) => {
        Prom.messagesSeen.inc()
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

        const cmd: Command = client.commands.find((c) => (c.name as string).toLowerCase() == command || (c.aliases && c.aliases.includes(command)))
        if (!cmd) return;

        if (!client.cooldowns.has(cmd.name)) {
            client.cooldowns.set(cmd.name, new Collection())
        }

        const ctx = {
            client,
            args,
            guild: message.guild,
            message, channel: message.channel,
            author: message.author,
            member: message.member,
            supabase,
            settings: server_data[0],
            config,
            isDeveloper: config.variables.developers.find(dev => dev.id === message.author.id)
        }
        // ! Override Command Restrictions if Message Author is on list of Developers
        // if (ctx.isDeveloper) cmd.AuthorPermissions = "NONE"

        // ! If Command is NSFW and channel is not marked as such, return
        if (cmd.nsfw && !ctx.channel.nsfw) return ctx.channel.send(
            lingua[ctx.settings.locale].CHANNEL_NOT_NSFW
        )

        if (cmd.AuthorPermissions !== "NONE" && ctx.member?.permissions.has(cmd.AuthorPermissions)) return ctx.channel.send(replace(/PERMISSIONS/gm, cmd.AuthorPermissions.join(", "), lingua[ctx.settings.locale].INSUFFICIENT_PERMISSIONS))


        const now = Date.now()
        const timestamps = client.cooldowns.get(cmd.name)
        const cooldown = (cmd.cooldown || 1) * 1000
        if (timestamps.has(ctx.author.id)) {
            const time = timestamps.get(ctx.author.id) + cooldown
            if (now < time) {
                let CooldownEmbed = new MessageEmbed()
                const left = (time - now) / 1000
                let title = replace(/COMMAND/g, cmd.name, lingua[ctx.settings.locale].ON_COOLDOWN)
                let description = replace(/COMMAND/g, cmd.name, replace(/COOLDOWN/g, `${cmd.cooldown}s`, replace(/TIME/g, left, lingua[ctx.settings.locale].ON_COOLDOWN_DESCRIPTION)))
                CooldownEmbed.setTitle(title)
                    .setDescription(description)
                    .setColor("ORANGE")
                return ctx.channel.send(CooldownEmbed)
            }
        } else {
            timestamps.set(ctx.author.id, now)
            setTimeout(() => timestamps.delete(ctx.author.id), cooldown)
            try {
                await cmd.command(ctx)

                // ? Check if Comnand exists in DB
                let { data: usage_check_data, error: usage_check_error } = await supabase.from<Usage>("usage").select().eq(`name`, cmd.name).limit(1)
                if (usage_check_data?.length == 0) {
                    let { data: c, error: d } = await supabase.from<Usage>('usage').insert({
                        name: cmd.name,
                        type: "command",
                        // amount: 1
                    })

                }

                let { data: command_usage_data, command_usage_error } = await supabase.from<Usage>('usage').update({ amount: (usage_check_data[0] || { amount: 0 }).amount + 1 }).select().eq("name", cmd.name)
                Logger.info({
                    type: "command:executed",
                    command: cmd.name,
                    message: args.join(' ') || `${cmd.name} was executed in ${chalk.red('[')}${ctx.guild.name}${chalk.red(']')}(${ctx.guild?.id})`
                })
            } catch (error) {
                // Logger.error(error)
                console.log(error)
                let ErrorEmbed = new MessageEmbed().setTitle(replace(/COMMAND/g, cmd.name, lingua[ctx.settings.locale].ON_ERROR)).setDescription(`\`${error.message}\`\n\n\`${error}\``).setColor("RED")
                ctx.channel.send(ErrorEmbed)
            }
        }

    }
}