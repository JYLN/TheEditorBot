module.exports = class Command {
    constructor(client, {
        name = null,
        desc = 'None provided.'
    }) {
        this.client = client;
        this.name = name;
        this.desc = desc;
    }
}
