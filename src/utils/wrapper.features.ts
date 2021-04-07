import sourcefinder from "./sourcefinder";
import shortlink from "./shortlink";
import { Message, TextChannel } from "discord.js";


let SL = /(nosl|no-?short(link(s|ing)?)?)/gmi
let SF = /(nosf|no-?source(find(er|ing)?)?)/gmi


function disabled(message: Message, feature: string) {

    switch (feature) {
        case 'sl':
            // @ts-ignore
            return SL.test((message.channel as TextChannel).topic)

        default:
            throw new Error("No Feature was defined.")
    }
}



export default async function Shortlink(message: Message, setting: boolean) {
    if (!setting) return;
    if (disabled(message, 'sl')) return;
    let links = await shortlink(message.content)

    if (!links) return;
    links.forEach(link => { return `<${link}>` })
    return message.channel.send(links?.join("\n"))

}