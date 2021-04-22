module.exports = class Error {
    constructor(client) {
        this.client = client;
    }

    run(err) {
        this.client.logger.error(err);
    }
}
