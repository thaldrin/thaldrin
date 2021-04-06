export type CommandContext = {

}


export type Server = {
    readonly id: string
    server_id: string
    prefix: string[]
    locale: string

    shortlinks: boolean
    embeds: boolean
    source: boolean
    interactiontext: boolean

}

export type Usage = {
    readonly id: string
    name: string,
    type: string
    amount: number
}