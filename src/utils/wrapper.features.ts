import Sourcefinder from "@thaldrin/sourcefinder";
import config from "../../config";
import shortlink from "./shortlink";
import { Message, TextChannel } from "discord.js";


const sourcefinder = new Sourcefinder(`Thaldrin/v${config.pkg.version} (t8.pm/bot)`)

let SL = /(nosl|no-?short(link(s|ing)?)?)/gmi
let SF = /(nosf|no-?source(find(er|ing)?)?)/gmi
let CMD = /(nocmd|no-?command(s)?)/gmi

function disabled(message: Message, feature: "sf" | "sl" | "cmd") {

    switch (feature) {
        case 'sl':
            // @ts-ignore
            return SL.test((message.channel as TextChannel).topic)
        case 'sf':
            // @ts-ignore
            return SF.test((message.channel as TextChannel).topic)
        case 'cmd':
            // @ts-ignore
            return CMD.test((message.channel as TextChannel).topic)

        default:
            throw new Error("No Feature was defined.")
    }
}



export async function Shortlink(message: Message, setting: boolean) {
    if (!setting) return;
    if (disabled(message, 'sl')) return;
    let links = await shortlink(message.content)

    if (!links) return;
    return message.channel.send(links?.join("\n"))

}

export async function SourceFinder(message: Message, setting: boolean) {
    if (!setting) return;
    if (disabled(message, 'sf')) return;
    let sources = await sourcefinder.find(message.content)
    if (!sources) return;
    return message.channel.send(sources?.join('\n'))
}

export async function Commands(message: Message) {
    return disabled(message, "cmd")
}