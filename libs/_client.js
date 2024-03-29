const { Client, Collection, Intents} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { settings, colors } = require('../utils/config')
const { readdirSync } = require('fs');
require('dotenv').config();

module.exports = class EditorBot extends Client {
    constructor() {
        super({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
        this.logger = require('../utils/Logger');
        this.settings = settings;
        this.colors = colors;
        this.commands = new Collection();
        this.slashCommands = new Collection();
    }

    eventHandler() {
        const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
        eventFiles.forEach(file => {
            this.logger.load(`Event: [${file}] has been loaded!`);
            const eventName = file.split('.')[0];
            const event = new (require(`../events/${file}`))(this);
            this.on(eventName, (...args) => event.run(...args));
            delete require.cache[require.resolve(`../events/${file}`)];
        });
    }

    commandHandler() {
        const commandFiles = readdirSync('./commands').filter(file => file.endsWith('js'));
        commandFiles.forEach(cmd => {
            const cmdProps = new (require(`../commands/${cmd}`))(this);
            if (cmdProps.name) {
                this.logger.load(`Command: [${cmd}] is loaded!`);
                this.commands.set(cmdProps.name, cmdProps);
            }
        });
    }

    slashCommandHandler() {
        const slashCommandFiles = readdirSync('./slashCommands').filter(file => file.endsWith('.js'));
        slashCommandFiles.forEach(cmd => {
            const command = new (require(`../slashCommands/${cmd}`))(this);
            this.slashCommands.set(command.data.name, command);
        });
    }

    loadSlashCommands() {
        const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
        (async () => {
            try {
                console.log('Started refreshing application commands.');

                await rest.put(
                    Routes.applicationGuildCommands('829220185503694849', '455482977883914290'),
                    {body: this.slashCommands.map(command => command.data.toJSON())},
                );

                console.log('Successfully reloaded application commands.')
            } catch (e) {
                console.error(e);
            }
        })();
    }

    init() {
        this.eventHandler();
        this.commandHandler();
        this.slashCommandHandler();
        this.loadSlashCommands();

        this.login(process.env.TOKEN);
    }
}
