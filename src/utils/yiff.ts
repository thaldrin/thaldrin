import Yiff from 'yiff'
import config from '../../config'
import pkg from '../../package.json'
let yiff = new Yiff({
    useragent: `${config.variables.name}/v${pkg.version} (t8.pm/bot)`,
    apikey: {
        sheri: config.apis.sheri,
        yiffrest: config.apis.yiffrest,
        thaldrin: config.apis.thaldrin
    }
})

export default yiff