import path from "path"
import { readdirSync as read } from "fs"

export async function Folders() { return await read(path.join(__dirname, '../modules')) }
export async function Commands(module: string, Thaldrin: any) { return Thaldrin.commands.filter((command: any) => command.module === module) }