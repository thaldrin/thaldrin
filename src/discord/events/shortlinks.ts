import { Message } from 'discord.js';
import Shortlink from '../../utils/shortlink';
import { EuClient } from '../../modules/eu/src/misc/types';
import modulus from '../../utils/modulus'
export = {
    name: "messageCreate",
    run: async (Eu: EuClient, message: Message) => {
        if (message.author.bot) return;
        let server = await modulus.server(message.guild.id);
        if (!server.shortlinks) return
        let SLs = await Shortlink(message.content)
        if (!SLs) return
        return message.channel.send(SLs.join('\n'))
    }
};