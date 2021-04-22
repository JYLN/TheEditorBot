const Command = require('../libs/_command');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            desc: 'Pings the Discord API and returns the latency and API ping'
        });
    }

    async exe(msg) {
        msg.channel.send('🏓 Pinging...').then((newMsg) => {
            msg.channel.startTyping(1);
            setTimeout(async () => {
                await msg.channel.stopTyping(true);
                const pongEmbed = {
                    color: this.client.colors.green,
                    description: `🏓 **Pong!**\nAPI Latency: ${Math.round(parseInt(this.client.ws.ping))}ms`,
                };
                newMsg.delete();
                msg.channel.send({ embed: pongEmbed });
            }, 1750);
        });
    }
}
