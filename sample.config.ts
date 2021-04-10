import variables from "./variables"
import pkg from './package.json'
import { Config } from './src/utils/types'

export default <Config>{
    pkg,
    variables,
    token: "",
    apis: {
        sheri: "",
        yiffrest: ""
    },
    supabase: {
        url: "",
        key: ""
    }
}