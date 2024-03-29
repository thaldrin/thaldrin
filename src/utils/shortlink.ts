// Initial code taken from @Cynosphere, rewritten by me

const Regex =
    /(?:\s|^)(gh|gl|yt|tw|npm|tv|bc|bcu|wc|sc|bot|fa)\/([a-zA-Z0-9-_.#@/!]*)/g;

const Links: { [value: string]: string } = {
    "gh": "https://github.com/$link$",
    "gl": "https://gitlab.com/$link$",
    "yt": "https://youtu.be/$link$",
    "tw": "https://twitter.com/$link$",
    "npm": "https://npm.im/$link$",
    "tv": "https://twitch.tv/$link$",
    "bc": "https://$link$.bandcamp.com/",
    "bcu": "https://bandcamp.com/$link$",
    "wc": "https://werewolf.codes/$link$",
    "sc": "https://soundcloud.com/$link$",
    fa: "https://furaffinity.net/$link$",
    // "fav": "https://furaffinity.net/view/$link$",
    // "fau": "https://furaffinity.net/user/$link$",
    "bot": "https://discordapp.com/oauth2/authorize?client_id=$link$&scope=bot",
};
const SiteNames = {
    gh: "Github",
    gl: "Gitlab",
    gd: "Gitdab",
    yt: "Youtube",
    tw: "Twitter",
    npm: "NPM",
    tv: "Twitch",
    fa: "FurAffinity",
    // fav: "FurAffinity Post",
    // fau: "FurAffinity User",
    bc: "Bandcamp Band",
    bcu: "Bandcamp User",
    sc: "Soundcloud",
    bot: "Bot Invites",
    wc: "werewolf.codes",
};

export default async function Shortlink(content: string) {
    let Possible: string[] = [];
    let res = content.match(Regex);
    if (!res) return;
    res = res.map((x) => (x.startsWith(" ") ? x.substring(1) : x));
    for (const Shortlink in res) {
        for (const Link in Links) {
            let content = res[Shortlink];
            if (!content.startsWith(Link)) continue;
            content = content.replace(Link + "/", "");
            content = Links[Link].replace("$link$", content);
            Possible.push(`<${content}>`);
        }
    }
    // @ts-ignore
    return Possible;
}