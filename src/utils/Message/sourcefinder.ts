import axios from "axios";
import { MessageCreateEvent } from "wumpcord";
const md5 = new RegExp(
    "((?:!)?https?://static[0-9]*.(?:e621|e926).net/data/(?:sample/|preview/|)[0-9a-f]{2}/[0-9a-f]{2}/([0-9a-f]{32}).([0-9a-z]+))",
    "igm"
);
const search_md5 = "https://e621.net/posts.json?md5=";
const e6 = "https://e621.net/posts/";
const e9 = "https://e926.net/posts/";
const version = "0.3.0";

export async function SourceFinder(event: MessageCreateEvent, settings = true) {
    if (!settings || settings === null || settings === undefined) return;
    let Links = event.message.content.match(md5);
    if (!Links) return;

    let Sources: string[] = []
    for (const index in Links) {
        let ImageURL = Links[index]
        let ImageHash = ImageURL.split(md5)[2]
        let { data } = await axios.get(`${search_md5}${ImageHash}`, {
            headers: {
                "User-Agent": `SourceFinder/${version} by hokkqi (https://kji.tf/twitter)`
            }
        })
        let source;
        switch (data.rating) {
            case 's':
                source = `${e9}${data.post.id}`
                break;
            default:
                source = `${e6}${data.post.id}`
                break;
        }
        Sources.push(`<${source}>`)
    }
    return event.message.reply(`:link: :mag:\n${Sources.join('\n')}`)
}