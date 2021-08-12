const Command = require('../libs/_command');

module.exports = class Color extends Command {
    constructor(client) {
        super(client, {
            name: 'color',
            desc: 'Change the color of your name'
        });
    }

    async exe(msg, args) {
        const userRole = msg.guild.roles.cache.find(role => role.name === msg.author.username);
        const embed = {
            color: this.client.colors.green,
            description: 'You have successfully changed your name color.'
        }

        if (!args || args.length < 1 || TypeError) {
            const helpEmbed = {
                color: this.client.colors.red,
                title: 'Incorrect Usage',
                description: `**@The Editor color <color>**\nPlease reference the link below to use regular colors or enter an HTML Hexadecimal code to set your color.\nhttps://gist.github.com/thomasbnt/b6f455e2c7d743b796917fa3c205f812#file-code_colors_discordjs-md`
            }

            return msg.channel.send({embeds: [helpEmbed]});
        }

        if (userRole) {
            userRole.setColor(args[0]).then(() => {
                msg.channel.send({embeds: [embed]});
            }).catch(err => {
                this.client.logger.error(err);
            });
        } else {
            msg.guild.roles.create({
                data: {
                    name: msg.author.username,
                    color: args[0],
                    position: (msg.member.roles.highest.position + 1),
                },
                reason: `Created for ${msg.author.tag}`
            }).then(newRole => {
                msg.member.roles.add(newRole).then( () => {
                    msg.channel.send({embeds: [embed]});
                });
            }).catch(err => {
                this.client.logger.error(err)
            });
        }
    }
}
