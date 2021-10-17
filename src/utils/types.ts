import { Guild, Message, TextChannel } from "discord.js"
import Modulus from "../modules/modulus/src/index"
import { EuClient } from "../modules/eu/src/misc/types"

export type Features =
    | "shortlinks"
    | "shortlink"
    | "sl"


    | "sauce"
    | "source"
    | "sourcefinder"
    | "sf"

    | "embeds"
    | "embedimages"

    | "rp"
    | "interactiontext"

export type Server = {
    readonly id: string
    server_id: string
    locale: string
    prefix: string[]

    shortlinks: boolean
    sourcefinder: boolean
    embeds: boolean
    interaction_text: boolean

}

export type Usage = {
    readonly id: string
    name: string,
    type: string
    amount: number
}

export type Context = {
    Eu: EuClient,
    args: string[]
    guild: Guild
    message: Message,
    channel: TextChannel
    member: Message["member"]
    author: Message["author"]
    modulus: Modulus
    settings: Server
    config: any
    isDev: boolean
}