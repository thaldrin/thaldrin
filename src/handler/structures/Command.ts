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
  constructor(command: CommandContext) {
    this.name = command.name || "";
    this.description = command.description || "";
    this.aliases = command.aliases || [];
    this.module = command.module || "";
    this.cooldown = command.cooldown || 0;
    this.guild = command.guild || false;
    this.dev = command.dev || false;
    this.nsfw = command.nsfw || false;
    this.AuthorPermissions = command.AuthorPermissions || "NONE";
    this.hidden = command.hidden || false;
  }

  async run(ctx: Context) {
    ctx.channel.send("This is the default command, overwrite me.")
  }
};
