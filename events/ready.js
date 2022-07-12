module.exports = class Ready {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.logger.ready(`${this.client.user.tag} is ready!`);
    }
}
