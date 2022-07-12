const Chalk = require('chalk');
const Moment = require('moment');

const timestamp = `[${Moment().format('YYYY-MM-DD HH:mm:ss')}]:`;

module.exports = {
    load(content) {
        return console.log(`${timestamp}${Chalk.yellow(`[LOAD]`)} ${content}`);
    },
    ready(content) {
        return console.log(`${timestamp}${Chalk.green(`[READY]`)} ${content}`);
    },
    warn(content) {
        return console.log(`${timestamp}${Chalk.black.bgYellow(`[WARN]`)} ${content}`);
    },
    error(content) {
        return console.log(`${timestamp}${Chalk.red(`[ERR]`)} ${content.stack}`);
    },
    cmd(content) {
        return console.log(`${timestamp}${Chalk.black.bgWhite(`[CMD]`)} ${content}`)
    },
    debug(content) {
        return console.log(`${timestamp}${Chalk.black.bgGreen(`[DEBUG]`)} ${content}`);
    }
}
