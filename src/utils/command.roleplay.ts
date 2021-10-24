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
        case "hug": {
            let request = await yiff.sheri("hug")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "boop": {
            let request = await yiff.sheri("boop")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "kiss": {
            let request = await yiff.sheri("kiss")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "lick": {
            let request = await yiff.sheri("lick")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "hold": {
            let request = await yiff.sheri("hold")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "cuddle": {
            let request = await yiff.sheri("cuddle")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_hug": {
            let request = await yiff.sheri("nhug")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_kiss": {
            let request = await yiff.sheri("nkiss")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_lick": {
            let request = await yiff.sheri("nlick")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_hold": {
            let request = await yiff.sheri("nhold")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_cuddle": {
            let request = await yiff.sheri("ncuddle")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
        case "nsfw_bulge": {
            let request = await yiff.sheri("nbulge")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, line: line(action), provider: "sheri.bot" };

        }
    }
}