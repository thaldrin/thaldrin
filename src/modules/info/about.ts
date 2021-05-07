import { Context } from '../../utils/types';
import Command from '../../handler/structures/Command';
import { MessageEmbed } from 'discord.js';
import config from '../../../config';

export = class Info extends Command {
    constructor() {
        super({
            name: "about",
            description: "Show Information about the Bot",
            cooldown: 0
        })
    }

    async command(ctx: Context) {
        let devs: string[] | string = []
        let contribs: string[] | string = []
        if (ctx.config.variables.developers.length > 1) {
            ctx.config.variables.developers.forEach(dev => {
                // @ts-ignore
                return devs.push(`\n**- [${ctx.client.users.cache.get(dev.id)?.username}](${dev.link})**`)
            })
            devs = devs.join(' ')
        } else {
            devs = `**[${ctx.client.users.cache.get(ctx.config.variables.developers[0].id)?.username}](${ctx.config.variables.developers[0].link})**`
        }
        if (ctx.config.variables.contributors.length > 1) {
            ctx.config.variables.contributors.forEach(contributor => {
                // @ts-ignore
                return contribs.push(`\n**- [${contributor.nick}](${contributor.link})** - ${contributor.reason}`)
            })
            contribs = contribs.join(' ')
        } else {
            contribs = `**[${ctx.config.variables.contributors[0].nick}](${ctx.config.variables.contributors[0].link})** - ${ctx.config.variables.contributors[0].reason}`
        }
        let InfoEmbed = new MessageEmbed()
            .setDescription(`
            Made by ${devs}`)
            .addField("Contributors", `${contribs}`, false)
            .addField("Source", config.variables.source, true)
            .addField("Support Server", `[${ctx.client.guilds.cache.get(ctx.config.variables.support.id)?.name}](${ctx.config.variables.support.invite})`, true)
            .addField("Website", `[${ctx.config.variables.website}](https://${ctx.config.variables.website})`, true)
            .setColor(ctx.config.variables.color)
            .setFooter(`${config.variables.name}, ${config.variables.tagline}`, config.variables.avatar)

        ctx.channel.send(InfoEmbed)
    }
}