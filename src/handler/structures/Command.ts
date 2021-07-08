import { Context, Command as CommandContext } from "../../utils/types";

export default class Command {
  name: string;
  description: string;
  aliases: string[];
  module: string;
  cooldown: number;
  guild: boolean;
  dev: boolean;
  nsfw: boolean;
  AuthorPermissions: string | string[];
  hidden: boolean;
  usage: string
  constructor(command: CommandContext) {
    this.name = command.name || "generic";
    this.description = command.description || "generic command base";
    this.aliases = command.aliases || [];
    this.module = command.module || "";
    this.cooldown = command.cooldown || 1;
    this.guild = command.guild || false;
    this.dev = command.dev || false;
    this.nsfw = command.nsfw || false;
    this.AuthorPermissions = command.AuthorPermissions || "NONE";
    this.hidden = command.hidden || false;
    this.usage = command.usage || ''
  }

  async run(ctx: Context) {
    ctx.channel.send("This is the default command, overwrite me.")
  }
};
