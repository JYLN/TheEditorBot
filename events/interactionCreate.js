module.exports = class InteractionCreate {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isCommand() || !this.client.commands.has(interaction.commandName)) return;

        try {
            await this.client.commands.get(interaction.commandName).execute(interaction);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}
