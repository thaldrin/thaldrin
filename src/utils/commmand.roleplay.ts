import yiff from "./yiff";

type action =
    "hug"
    | "boop"
    | "kiss"
    | "lick"
    | "hold"
    | "cuddle"
    | "nsfw_hug"
    | "nsfw_kiss"
    | "nsfw_lick"
    | "nsfw_hold"
    | "nsfw_cuddle"
    | "nsfw_bulge"

function line(category: action) {

    return undefined
}

export async function request(action: action, locale: string) {
    switch (action) {
        case "hug":
            return { image: await yiff.sheri("hug"), provider: "sheri.bot", line: line(action) };
        case "boop":
            return { image: await yiff.sheri("boop"), provider: "sheri.bot", line: line(action) };
        case "kiss":
            return { image: await yiff.sheri("kiss"), provider: "sheri.bot", line: line(action) };
        case "lick":
            return { image: await yiff.sheri("lick"), provider: "sheri.bot", line: line(action) };
        case "hold":
            return { image: await yiff.sheri("hold"), provider: "sheri.bot", line: line(action) };
        case "cuddle":
            return { image: await yiff.sheri("cuddle"), provider: "sheri.bot", line: line(action) };
        case "nsfw_hug":
            return { image: await yiff.sheri("nhug"), provider: "sheri.bot", line: line(action) };
        case "nsfw_kiss":
            return { image: await yiff.sheri("nkiss"), provider: "sheri.bot", line: line(action) };
        case "nsfw_lick":
            return { image: await yiff.sheri("nlick"), provider: "sheri.bot", line: line(action) };
        case "nsfw_hold":
            return { image: await yiff.sheri("nhold"), provider: "sheri.bot", line: line(action) };
        case "nsfw_cuddle":
            return { image: await yiff.sheri("ncuddle"), provider: "sheri.bot", line: line(action) };
        case "nsfw_bulge":
            return { image: await yiff.sheri("nbulge"), provider: "sheri.bot", line: line(action) };
    }
}

