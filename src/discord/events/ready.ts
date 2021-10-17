
export = {
    name: "ready",
    run: async (Eu: any) => {
        console.log(`${Eu.user.username} is ready!`);
    }
};