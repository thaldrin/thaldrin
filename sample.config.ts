import variables from "./variables"
import pkg from './package.json'
import { Config } from './src/utils/types'

export default <Config>{
    pkg,
    variables,
    token: "",
    apis: {
        sheri: "",
        yiffrest: "",
        thaldrin: ""
    },
    supabase: {
        url: "",
        key: ""
    },

    trello: {
        key: "",
        token: "",
        board: "",
        options: {
            list: {
                bugs: "",
                suggestions: ""
            }
        }
    }

}