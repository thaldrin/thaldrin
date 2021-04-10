import config from '../../config'
import replace from './replace'
let SensitiveStrings = [
    config.token,
    config.supabase.key,
    config.supabase.url,
    config.apis.sheri,
    config.apis.yiffrest,
].flat(Infinity)


export default function clean(content: any) {
    let type = content
    if (typeof type === 'object') {
        content = JSON.stringify(content)
    }
    let regex = new RegExp(`(${SensitiveStrings.join("|")})`, "gi")
    content = replace(regex, "*snip*", content)
    if (typeof type === 'object') {
        content = JSON.parse(content)
    }
    return content
}