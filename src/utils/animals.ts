import { ApplicationCommandPermissionTypes } from "discord.js/typings/enums";
import yiff from "./yiff";

type animal = "bird" | "cat" | "fox" | "hyena" | "shibe" | "wolf";

export default async function request(animal: animal) {
    switch (animal) {
        case "shibe": {
            let request = await yiff.shibe("shibes", 1)

            let proxied = request.map(x => ("https://proxy.thaldrin.media/" + x))
            return { image: proxied, provider: "shibe.online" };
        }
        case "bird": {
            let request = await yiff.shibe("birds", 1)
            let proxied = request.map(x => ("https://proxy.thaldrin.media/" + x))
            return { image: proxied, provider: "shibe.online" };
        }
        case "cat": {
            let request = await yiff.shibe("cats", 1)
            let proxied = request.map(x => ("https://proxy.thaldrin.media/" + x))
            return { image: proxied, provider: "shibe.online" };
        }
        case "fox": {
            let request = await yiff.thaldrin("foxes")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, provider: "thaldr.in" };
        }
        case "hyena": {
            let request = await yiff.thaldrin("yeens")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, provider: "thaldr.in" };
        }
        case "wolf": {
            let request = await yiff.thaldrin("wolves")
            let image = "https://proxy.thaldrin.media/" + request.url
            return { image, provider: "thaldr.in" };
        }
    }
}