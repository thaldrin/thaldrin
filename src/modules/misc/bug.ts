import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import SendWS from "../../utils/webhook";
import language from '../../utils/language';
import { bug } from '../../utils/trello';
import replace from '../../utils/replace';
export = class Suggestion extends Command {
    constructor() {
        super({
            name: "bug",
            description: "Report a Bug",
            aliases: ["bugreport"],
            cooldown: 10,
        })
    }

    async command(ctx: Context) {
        const [title, desc] = ctx.args.join(" ").split("|").map(v => v.trim());
        // @ts-ignore
        if (!title) return ctx.channel.send(language.get(ctx.settings.locale).missing.title)
        let author = `${ctx.author.tag} (${ctx.author.id})`
        let guild = `${ctx.guild?.name} (${ctx.guild?.id})`

        await bug({ title, desc, author, guild })
        if (ctx.config?.webhook?.bug) await SendWS(ctx.config.webhook.bug, { title, desc, ctx })

        // @ts-ignore
        ctx.channel.send(replace(/VALUE/gi, "Bug Report", language.get(ctx.settings.locale).misc.sent))
    }
}