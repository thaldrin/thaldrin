import sourcefinder from "./sourcefinder";
import shortlink from "./shortlink";
import { Message } from "discord.js";


let SL = /(nosl|no-?short(link(s|ing)?)?)/gmi
let SF = /(nosf|no-?source(find(er|ing)?)?)/gmi



export default async function Shortlink(message: Message, setting: boolean) {
    if (!setting) return;

}