module.exports = class InteractionCreate {
    constructor(client) {
        this.client = client;
    }

    async run(interaction) {
        if (interaction.isAutocomplete()) {
            if (interaction.commandName === 'color') {
                const focused = interaction.options.getFocused();
                const choices = this.client.roleColorStrings;
                const filtered = choices.filter(choice => choice.startsWith(focused));
                await interaction.respond(
                    filtered.map(choice => ({name: choice, value: choice}))
                )
            }
        }

        if (!interaction.isCommand() || !this.client.commands.has(interaction.commandName)) return;

        try {
            await this.client.commands.get(interaction.commandName).execute(interaction);
            this.client.logger.cmd(`${interaction.member.user.username} ran ${interaction.commandName}`);
        } catch (error) {
            this.client.logger.error(error);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}
