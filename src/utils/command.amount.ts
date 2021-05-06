import path from "path"
import { readdirSync as read } from "fs"
import Thaldrin from '../handler/client/Client'
export async function Folders() { return await read(path.join(__dirname, '../modules')) }
export async function Commands(module: string, Thaldrin: Thaldrin) { return Thaldrin.commands.filter(command => command.module === module) }