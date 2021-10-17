import { Message } from 'discord.js';
import Shortlink from '../../utils/shortlink';
import { EuClient } from '../../modules/eu/src/misc/types';
import modulus from '../../utils/modulus'
import sauce from '../../utils/sourcefinder'
export = {
    name: "messageCreate",
    run: async (Eu: EuClient, message: Message) => {
        if (message.author.bot) return;
        let server = await modulus.server(message.guild.id);
        if (!server.sourcefinder) return

        let sauces = await sauce.find(message.content);
        if (!sauces) return;
        return message.channel.send({ content: sauces.join('\n'), allowedMentions: { repliedUser: false }, reply: { messageReference: message.id } })
    }
};