import Command from "../../handler/structures/Command";
import { Context } from "../../utils/types";
import lingua from "../../utils/lingua";
import replace from "../../utils/replace";
import Roll from 'roll'
const roll = new Roll()

export = class Roll extends Command {
	constructor() {
		super({
			name: "roll",
			description: "Roll Dice",
			cooldown: 1,
			usage: "`amount`**d**`sides` `+-/*x`"
		});
	}

	async command(ctx: Context) {
		let Dice: string = ctx.args[0]
		let diceThrow = roll.roll(Dice)

		// @ts-ignore
		let RollMessage = await ctx.channel.send(`${replace(/AMOUNT/gi, diceThrow.input.quantity, replace(/DICE/gi, `d${diceThrow.input.sides}`, lingua[ctx.settings.locale].ROLL))}`);
		await RollMessage.edit(`:game_die: **Results**
		Throws: **${diceThrow.rolled.join("**, **")}**
		Total: **${diceThrow.result}**`)
	}
};
