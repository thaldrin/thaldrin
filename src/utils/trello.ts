import { Trello as TClient } from "trello-helper";
import config from '../../config'

process.env.trelloHelper = JSON.stringify({
    appKey: config.trello.key,
    token: config.trello.token
})

const Trello = new TClient({
    useExistingEnvVar: true
})


export async function suggest({ title, desc, author, guild }: { title: string, desc?: string, author: string, guild: string }) {
    let Card = await Trello.addCard({
        idList: config.trello.options.list.suggestions,
        name: `Suggestion - ${title}`,
        desc: `
        ${desc || title}

        Author: ${author}
        Server: ${guild}
        `
    })

    return Card
}
export async function bug({ title, desc, author, guild }: { title: string, desc?: string, author: string, guild: string }) {
    let Card = await Trello.addCard({
        idList: config.trello.options.list.bugs,
        name: `Bug - ${title}`,
        desc: `
        ${desc || title}

        Author: ${author}
        Server: ${guild}
        `
    })

    return Card
}


export default Trello