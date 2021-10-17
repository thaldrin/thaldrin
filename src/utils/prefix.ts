import modulus from "./modulus";
import config from "./config";

export default async function prefix(id: string, message: string) {
    let server = await modulus.server(id)
    // @ts-ignore
    let prefixes: string[] = [...config.prefixes, ...server.prefix]
    let prefix: string
    let exists: boolean
    for (const p in prefixes) {
        if (message.startsWith(prefixes[p])) {
            prefix = p
            exists = true
        }
    }
    if (!exists) return { success: false }
    const args = message.slice(prefixes[prefix].length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    return { success: true, command, args, prefix }
}