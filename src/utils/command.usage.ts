import supabase from "./database";
import { Command, Usage } from "./types";

type C = { name: string; amount: number };

export default async function usage(c: Map<string, Command>) {
  let commands: C[] = [];

  let { data, error } = await supabase
    .from<Usage>("usage")
    .select()
    .filter("type", "eq", "command");
  for (const command in data) {
    // @ts-ignore
    commands.push({ name: data[command].name, amount: data[command].amount });
  }

  return commands.sort((a, b) => a.amount - b.amount);
}
