import { Client, Collection } from "discord.js";
import { readdirSync as read } from "fs";
import path from "path";
import Logger from "../../utils/logger";
// const server = require('../../website/server');

export default class Thaldrin extends Client {
	commands: Collection<unknown, unknown>;
	cooldowns: Collection<unknown, unknown>;
	config: any;
	lastEval: any;
	constructor(config: { token: any; }, shards: number) {
		super({
			// disableEveryone: true,
			// disabledEvents: ['TYnpm i --save-dev @types/wsPING_START'],
			shardCount: shards,
			// totalShardCount: shards
		});

		this.commands = new Collection();
		this.cooldowns = new Collection();
		// this.queues = new Collection();
		this.config = config;

		this.lastEval = null;

		this.login(config.token);
		this.load();
	}

	async load() {
		const events = await read(path.join(__dirname, '../../events'));
		const modules = await read(path.join(__dirname, '../../modules'));

		// server(this);

		events.filter((f) => f.endsWith('.js')).forEach((file) => {
			try {
				const event = require(path.join(__dirname, '../../events', file));

				this.on(event.name, event.run.bind(null, this));
			} catch (err) {
				console.error(err);
			}
		});

		modules.filter((f) => !f.endsWith('.js')).forEach(async (module) => {
			const commands = await read(path.join(__dirname, '../../modules', module));

			commands.filter((f) => f.endsWith('.js')).forEach((command) => {
				try {
					const file = require(path.join(__dirname, '../../modules', module, command));
					const Command = new file();
					Command.module = module
					Logger.info({
						type: "command:loaded",
						command: Command.name,
						message: `${Command.name} was loaded`
					})
					this.commands.set(Command.name, Command);
				} catch (err) {
					console.error(err);
				}
			});
		});
	}
};