export type CommandContext = {

}


export type Server = {
    id: string
    server_id: string
    prefix: string[]
    locale: string

    shortlinks: boolean
    embeds: boolean
    source: boolean
    interactiontext: boolean

}