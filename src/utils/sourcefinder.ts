import Sourcefinder from "@thaldrin/sourcefinder";
import { Message } from "discord.js";
import config from "../../config";
const sourcefinder = new Sourcefinder(`Thaldrin/v${config.pkg.version} (t8.pm/bot)`)


export default sourcefinder