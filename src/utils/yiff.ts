import Yiff from 'yiff'
import pkg from '../../package.json'
let yiff = new Yiff({
    useragent: `Thaldrin/v${pkg.version} (t8.pm/bot)`
})

export default yiff