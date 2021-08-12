module.exports = class Message {
    constructor(client) {
        this.client = client;
    }

    run(msg) {
        if (msg.author.bot || msg.channel.type === 'dm' || (msg.guild && !msg.channel.permissionsFor(msg.guild.me).missing('SEND_MESSAGES'))) return;

        const prefix = this.client.settings.prefixes.find(p => msg.content.startsWith(p));

        if (prefix) {
            const msgArray = msg.content.slice(prefix.length).split(/ +/);
            const requestedCmd = msgArray[0];
            let args = msgArray.slice(1);

            const cmd = this.client.commands.get(requestedCmd);
            if (cmd) {
                this.client.logger.log(`${msg.author.tag} ran ${cmd.name}`, 'cmd');
                cmd.exe(msg, args);
            }
        }
    }
}
