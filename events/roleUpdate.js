module.exports = class RoleUpdate {
    constructor(client) {
        this.client = client;
    }

    async run(oldRole, updated) {
        if (oldRole.name !== updated.name && oldRole.name.includes('Custom Color')) {
            await oldRole.guild.members.fetch().then(fetchMem => {
                fetchMem.forEach(mem => {
                    if (oldRole.name.includes(mem.user.id.substring(0,5))) {
                        updated.edit({name: `Custom Color ${mem.user.id.substring(0,5)}`}, 'Should not change role as it will break the role functionality of The Editor');
                    }
                });
            });
        }
    }
}
