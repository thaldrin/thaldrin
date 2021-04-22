import { MessageEmbed } from "discord.js";
import config from '../../config'
export default new MessageEmbed()
    .setColor(config.variables.color)
    .setFooter(`${config.variables.name}`, config.variables.avatar)