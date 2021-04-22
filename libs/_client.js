const { Client, Collection } = require('discord.js');
const { settings, colors } = require('../utils/config')
const { readdirSync } = require('fs');
require('dotenv').config();

module.exports = class EditorBot extends Client {
    constructor(options) {
        super(options, {
            ws: {intents: ['GUILD_MEMBERS']}
        });
        this.logger = require('../utils/Logger');
        this.settings = settings;
        this.colors = colors;
        this.commands = new Collection();
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

    init() {
        this.eventHandler();
        this.commandHandler();

        this.login(process.env.TOKEN);
    }
}
