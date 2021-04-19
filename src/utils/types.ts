import { SupabaseClient } from "@supabase/supabase-js";
import { Client, Guild, GuildMember, Message, NewsChannel, TextChannel, User } from "discord.js";

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

export type Command = {
    name: string;
    description: string;
    aliases?: string[];
    module?: string;
    cooldown?: number;
    guild?: boolean;
    dev?: boolean;
    nsfw?: boolean;
    AuthorPermissions?: string | string[];
    hidden?: boolean;
}

export type Context = {
    client: Client;
    args: string[]
    guild: Guild | null;
    message: Message;
    channel: TextChannel | NewsChannel;
    author: User;
    member: GuildMember | null;
    supabase: SupabaseClient;
    guildSettings: Server;
    config: Config;
    isDeveloper: string[]
}

// ! Config Typings

export interface Config {
    /**
     * package.json import to autocompltete it's vars 
     */
    pkg: Pkg;
    /**
    * variables.ts import
    * Public Variables are defined in here. 
    */
    variables: Variables;
    /**
     * API Keys for various APIs
     */
    apis: Apis;
    /**
     * Discord API Token
     */
    token: string;
    /**
     * Config Strings for Supabase
     * Thaldrin's Database
     */
    supabase: Supabase;
}

interface Developer {
    id: string;
    link: string
}

interface Supabase {
    url: string;
    key: string;
}

interface Apis {
    sheri: string;
    yiffrest: string;
    thaldrin: string;
}
interface Contributor {
    id: string;
    link: string
    nick: string
    reason: string
}
interface Variables {
    prefix: string[];
    developers: Developer[];
    contributors: Contributor[]

    // ! Mainly for the Info Command tbh
    name: string;
    source: string
    avatar: string
    tagline: string
    color: string,
    support: {
        id: string,
        invite: string
    }
    website: string
}

interface Pkg {
    name: string;
    version: string;
    description: string;
    main: string;
    scripts: Scripts;
    repository: Repository;
    keywords: any[];
    author: string;
    license: string;
    bugs: Bugs;
    homepage: string;
    dependencies: Dependencies;
    devDependencies: DevDependencies;
}

interface DevDependencies {
    '@types/node': string;
    '@types/ws': string;
}

interface Dependencies {
    '@supabase/supabase-js': string;
    '@thaldrin/sourcefinder': string;
    chalk: string;
    'discord.js': string;
    winston: string;
    'winston-daily-rotate-file': string;
    yiff: string;
}

interface Bugs {
    url: string;
}

interface Repository {
    type: string;
    url: string;
}

interface Scripts {
    build: string;
    start: string;
    dev: string;
    'update:subs': string;
}