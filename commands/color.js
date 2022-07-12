const SlashCommand = require("../libs/_slashCommand")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = class Color extends SlashCommand {
    constructor(client) {
        super(client, {
            data: new SlashCommandBuilder()
                .setName('color')
                .setDescription('Change the color of your name')
                .addStringOption(option =>
                    option.setName('color')
                        .setDescription('Enter a color string or a HTML hexadecimal code')
                        .setRequired(true)),
            async execute(interaction) {
                const userRole = interaction.guild.roles.cache.find(role => role.name === interaction.member.user.username);
                const embed = {
                    color: this.client.colors.green,
                    description: 'You have successfully changed your name color'
                }

                const errorEmbed = () => {
                    const helpEmbed = {
                        color: this.client.colors.red,
                        title: 'Incorrect Usage',
                        description: `Please reference the link below to use regular colors or enter an HTML Hexadecimal code to set your color.\nhttps://discord.js.org/#/docs/main/stable/typedef/ColorResolvable`
                    }

                    return interaction.reply({embeds: [helpEmbed], ephemeral: true});
                }

                if (!interaction.options.getString('color')) {
                    errorEmbed();
                }

                const getColor = interaction.options.getString('color').toUpperCase();

                if (userRole) {
                    userRole.setColor(getColor).then(() => {
                        interaction.reply({embeds: [embed]})
                    }).catch(err => {
                        this.client.logger.error(err);
                        errorEmbed();
                    });
                } else {
                    interaction.guild.roles.create({
                        name: interaction.member.user.username,
                        color: getColor,
                        position: (interaction.member.roles.highest.position + 1),
                        reason: `Created for ${interaction.member.user.tag}`
                    }).then(newRole => {
                        interaction.member.roles.add(newRole).then(() => {
                            interaction.reply({embeds: [embed]});
                        });
                    }).catch(err => {
                        this.client.logger.error(err);
                        errorEmbed();
                    });
                }
            }
        });
    }
}
