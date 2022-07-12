const SlashCommand = require('../libs/_slashCommand');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = class Ping extends SlashCommand {
    constructor(client) {
        super(client, {
            data: new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Simple command to ensure bot is responding; returns the latency of API response'),
            async execute(interaction) {
                const pongEmbed = {
                    color: this.client.colors.green,
                    description: `🏓 **Pong!**\nAPI Latency: ${Math.round(parseInt(this.client.ws.ping))}ms`,
                };
                interaction.reply({embeds: [pongEmbed]});
            }
        });
    }
}
