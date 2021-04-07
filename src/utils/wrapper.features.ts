import sourcefinder from "./sourcefinder";
import shortlink from "./shortlink";
import { Message } from "discord.js";


let SL = /(nosl|no-?short(link(s|ing)?)?)/gmi
let SF = /(nosf|no-?source(find(er|ing)?)?)/gmi


async function check(content: string, feature: string) {
    switch (feature) {
        case 'sl':
            console.log(content.match(SL))
            break;

        default:
            break;
    }
}



export default async function Shortlink(message: Message, setting: boolean) {
    if (!setting) return;
    let enabled = await check(message.content, 'sl')

}