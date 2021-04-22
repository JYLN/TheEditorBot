module.exports = class Ready {
    constructor(client) {
        this.client = client;
    }

    run() {
        this.client.logger.log(`${this.client.user.tag} is ready!`, 'ready');
    }
}
