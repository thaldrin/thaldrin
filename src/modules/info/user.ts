import Command from '../../handler/structures/Command';
import { Context } from '../../utils/types';
import lingua from '../../utils/lingua';

export = class User extends Command {
    constructor() {
        super({
            name: "user",
            description: "Get Information about a User",
            cooldown: 1,
        })
    }

    async command(ctx: Context) {
        //    !
        // let badges = ctx.client.users.cache.get(ID).flags.toArray()
    }
}