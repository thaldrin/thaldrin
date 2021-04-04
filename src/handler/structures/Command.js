module.exports = class Command {
  constructor(command) {
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
};
