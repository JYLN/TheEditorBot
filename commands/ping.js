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
            msg.channel.sendTyping();
            setTimeout(async () => {
                const pongEmbed = {
                    color: this.client.colors.green,
                    description: `🏓 **Pong!**\nAPI Latency: ${Math.round(parseInt(this.client.ws.ping))}ms`,
                };
                newMsg.delete();
                msg.channel.send({ embeds: [pongEmbed] });
            }, 1750);
        });
    }
}
