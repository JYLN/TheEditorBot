module.exports = class SlashCommand {
    constructor(client, {
        data= null,
        execute = null
    }) {
        this.client = client;
        this.data = data;
        this.execute = execute;
    }
}
