import { Message, Collection, TextChannel, MessageEmbed } from 'discord.js';
import { Context } from '../../utils/types';
import { EuClient } from '../../modules/eu/src/misc/types';
import modulus from '../../utils/modulus'
import prefixHandler from '../../utils/prefix'
import config from '../../utils/config';
import language from '../../utils/language';
import replace from '../../utils/replace';
export = {
    name: "messageCreate",
    run: async (Eu: EuClient, message: Message) => {
        if (message.author.bot) return;

        let helper = await prefixHandler(message.guild.id, message.content)
        if (!helper.success) return

        // @ts-ignore
        const cmd = Eu.commands.find((c) => c.name == helper.command || (c.aliases && c.aliases.includes(helper.command)))
        if (!cmd) return

        if (!Eu.cooldowns.has(cmd.name)) {
            Eu.cooldowns.set(cmd.name, new Collection())
        }

        let ctx: Context = {
            Eu, message, modulus, config,
            args: helper.args,
            channel: (message.channel as TextChannel),
            guild: message.guild,
            member: message.member,
            author: message.author,
            settings: await modulus.server(message.guild.id),
            // @ts-ignore
            isDev: config?.devs.find(d => d == message.author.id)

        }

        if (ctx.isDev) cmd.permissions = ["NONE"]
        if (cmd.permissions !== [] && ctx.member.permissions.toArray().some(p => cmd.permissions.includes(p)))
            return ctx.channel.send(replace(/PERMISSIONS/gm, cmd.permissions.join(', '), language.get(ctx.settings.locale).error.permissions))

        if (cmd.nsfw && !ctx.channel.nsfw) return ctx.channel.send(language.get(ctx.settings.locale).error.nsfw)

        const now = Date.now()
        const timestamps = Eu.cooldowns.get(cmd.name)
        const cooldown = (cmd.cooldown || 1) * 1000
        // @ts-ignore
        if (timestamps.has(ctx.author.id)) {
            // @ts-ignore
            const time = timestamps.get(ctx.author.id) + cooldown
            if (now < time) {
                const left = ((time - now) / 1000).toFixed(1)
                let embed = new MessageEmbed()
                    .setTitle(replace(/COMMAND/gm, cmd.name, language.get(ctx.settings.locale).error.cooldown.name))
                    // @ts-ignore
                    .setDescription(replace(/COMMAND/gm, cmd.name, replace(/COOLDOWN/gm, `${cmd.cooldown}s`, replace(/TIME/g, left, language.get(ctx.settings.locale).error.cooldown.desc))))
                    .setColor("RED")

                // @ts-ignore
                return message.channel.send({ embeds: [embed] })
            }
        } else {
            // @ts-ignore
            timestamps.set(ctx.author.id, now)
            setTimeout(() => {
                // @ts-ignore
                timestamps.delete(ctx.author.id, now)
            }, cooldown);
            try {
                await cmd.run(ctx)
            } catch (error) {

                let ErrorEmbed = new MessageEmbed().setTitle(replace(/COMMAND/g, cmd.name, language.get(ctx.settings.locale).error.error)).setDescription(`\`${error.message}\`\n\n\`${error}\``).setColor("RED")
                return message.channel.send({ embeds: [ErrorEmbed] })
            }
        }
    }
};