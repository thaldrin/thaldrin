import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import SendWS from "../../utils/webhook";
import language from '../../utils/language';
import { suggest } from '../../utils/trello';
export = class Suggestion extends Command {
    constructor() {
        super({
            name: "suggest",
            description: "Suggest a Feature!",
            aliases: ["suggestion"],
            cooldown: 10,
        })
    }

    async command(ctx: Context) {
        const [title, desc] = ctx.args.join(" ").split("|").map(v => v.trim());
        // @ts-ignore
        if (!title) return ctx.channel.send(language.get(ctx.settings.locale).missing.title)
        let author = `${ctx.author.tag} (${ctx.author.id})`
        let guild = `${ctx.guild?.name} (${ctx.guild?.id})`

        await suggest({ title, desc, author, guild })
        if (ctx.config?.webhook?.suggestions) await SendWS(ctx.config.webhook.suggestions, { title, desc, ctx })

        // @ts-ignore
        ctx.channel.send(replace(/VALUE/gi, "Suggestion", language.get(ctx.settings.locale).misc.sent))
    }
}