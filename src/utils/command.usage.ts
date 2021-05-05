import supabase from "./database"
import { Command, Usage } from "./types"

export default async function usage(c: Map<string, Command>) {
    let commands: string[] = []

    let { data, error } = await supabase.from<Usage>("usage").select().filter("type", "eq", "command")
    for (const command in data) {
        // @ts-ignore
        commands.push({ name: data[command].name, amount: data[command].amount })
    }

    return commands
}