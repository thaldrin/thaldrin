import sauce from "@thaldrin/sourcefinder"
import pkg from "../../package.json"

let saucefinder = new sauce(`${pkg.name}/v${pkg.version} (https://t8.pm/sourcefinder)`)

export default saucefinder