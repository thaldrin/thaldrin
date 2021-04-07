export type CommandContext = {

}


export type Server = {
    readonly id: string
    server_id: string
    locale: string
    prefix: string[]

    shortlinks: boolean
    sourcefinder: boolean
    embeds: boolean
    interactiontext: boolean

}

export type Usage = {
    readonly id: string
    name: string,
    type: string
    amount: number
}