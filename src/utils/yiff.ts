import Yiff from 'yiff'
import config from './config'
import pkg from '../../package.json'
let yiff = new Yiff({
    useragent: `${pkg.name}/v${pkg.version} (t8.pm/bot)`,
    killswitch: {
        enabled: false
    },
    apikey: {
        // @ts-ignore
        sheri: config.tokens.sheri,
        // @ts-ignore
        yiffrest: config.tokens.yiffy,
        // @ts-ignore
        thaldrin: config.tokens.thaldrin
    }
})

export default yiff