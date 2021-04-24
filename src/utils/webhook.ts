import { Guild, MessageEmbed, User, WebhookClient } from "discord.js";
import { Webhook } from "../utils/types"
import embed from "../utils/embed";
import config from "../../config";
export default async function SendWS(
    webhook: Webhook,
    content: {
        title: string,
        desc: string,
        ctx: {
            author: User,
            guild: Guild | null
        }
    }) {

    let Hook = new WebhookClient(webhook.id, webhook.token)
    let author = `${content.ctx.author.username} (${content.ctx.author.id})`
    let guild = `${content.ctx.guild?.name} (${content.ctx.guild?.id})`
    // @ts-ignore
    embed.setAuthor(`${author}\n${guild}`, content.ctx.author.avatarURL())
    embed.setDescription(`${content.title}${content.desc ? `\n\n${content.desc}` : ""}`)

    Hook.send(`New ${webhook.type}`, {
        username: webhook.username,
        avatarURL: config.variables.avatar,
        embeds: [embed]
    })
}