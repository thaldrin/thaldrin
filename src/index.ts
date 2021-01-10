import { Client, MessageCreateEvent } from "wumpcord";
import config from "./config"
import { Shortlink } from "./utils/Message/shortlinks";
import { SourceFinder } from "./utils/Message/sourcefinder";
import Armpit from "@sniff/armpits";

const Armpits = new Armpit()

Armpits.info("Starting up...")

const client = new Client({
    token: config.TOKEN,
    interactions: true,
    ws: { intents: ['guilds', 'guildMessages'] }
});

// Ignore the @ts-ignore lines, those are because of 
// inconsistent Typings within Wumpcord at the time of writing these files

client.on('message', async (event: MessageCreateEvent) => {
    if (event.message.author.bot) return;
    // Grab Server Settings from Redis Cache before doing anything?
    Shortlink(event, false)
    SourceFinder(event, true)
    // @ts-ignore
    if (event.message.content === '!ping') return await event.message.channel.reply("pong")
});


client.on('ready', async () => {
    console.log(`Connected as ${client.user.tag}!`);
    client.setStatus('online', { // Sets it to "Competing in uwu"
        type: 5,
        name: 'uwu'
    });
});




client.connect();