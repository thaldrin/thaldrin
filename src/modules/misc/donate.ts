import Command from "../../handler/structures/Command";
import { Context } from "../../utils/types";
import lingua from "../../utils/lingua";
import replace from "../../utils/replace";
import Roll from 'roll'
import { MessageEmbed } from "discord.js";
const roll = new Roll()

export = class Donate extends Command {
    constructor() {
        super({
            name: "donate",
            description: "See ways to support Thaldrin's Development",
            cooldown: 1,
        });
    }

    async command(ctx: Context) {
        let embed = new MessageEmbed().setColor(ctx.config.variables.color).setFooter(`${ctx.config.variables.name}`, ctx.config.variables.avatar)
        embed.setTitle(`Donate`)
    };
}
