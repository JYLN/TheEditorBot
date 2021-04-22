module.exports = class RoleUpdate {
    constructor(client) {
        this.client = client;
    }

    run(oldRole, updated) {
        if (oldRole.name !== updated.name) {
            oldRole.guild.members.fetch().then(fetchMem => {
                fetchMem.forEach(mem => {
                    if (mem.user.username === oldRole.name) {
                        updated.edit({name: mem.user.username}, 'Should not change role as it will overfill server with roles made from The Editor.');
                    }
                });
            });
        }
    }
}
