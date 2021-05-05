import Command from "../../handler/structures/Command";
import { Context } from "../../utils/types";
import lingua from "../../utils/lingua";
import replace from "../../utils/replace";
import Roll from 'roll'
const DiceRegex = /^(?<amount>\d*)d(?<die>\d*)/

const roll = new Roll()

export = class Roll extends Command {
	constructor() {
		super({
			name: "roll",
			description: "Roll Dice",
			cooldown: 0,
		});
	}

	async command(ctx: Context) {
		let Dice = ctx.args.join(" ")
		// @ts-ignore
		let { amount, die } = Dice.match(DiceRegex)?.groups
		let total = 0
		// @ts-ignore
		let RollMessage = await ctx.channel.send(`${replace(/AMOUNT/gi, 1, replace(/DICE/gi, "d20", lingua[ctx.settings.locale].ROLL))}`);
		while (total <= amount) {
			// @ts-ignore
			await RollMessage.edit(RollMessage.content += replace(/RESULT/gi, 1, replace(/CURRENT/gi, total, replace(/AMOUNT/gi, amount, lingua[ctx.settings.locale].ROLL_MSG))))
			total++
		}
	}
};
