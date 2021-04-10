import Yiff from 'yiff'
import config from '../../config'
import pkg from '../../package.json'
let yiff = new Yiff({
    useragent: `Thaldrin/v${pkg.version} (t8.pm/bot)`,
    apikey: {
        sheri: config.apis.sheri,
        yiffrest: config.apis.yiffrest
    }
})

export default yiff