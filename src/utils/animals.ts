import yiff from "./yiff";

type animal = "bird" | "cat" | "fox" | "hyena" | "shibe" | "wolf";

export default async function request(animal: animal) {
    switch (animal) {
        case "shibe":
            return { image: await yiff.shibe("shibes", 1), provider: "shibe.online" };
        case "bird":
            return { image: await yiff.shibe("birds", 1), provider: "shibe.online" };
        case "cat":
            return { image: await yiff.shibe("cats", 1), provider: "shibe.online" };
        case "fox":
            return { image: await yiff.thaldrin("foxes"), provider: "thaldr.in" };
        case "hyena":
            return { image: await yiff.thaldrin("yeens"), provider: "thaldr.in" };
        case "wolf":
            return { image: await yiff.thaldrin("wolves"), provider: "thaldr.in" };
    }
}