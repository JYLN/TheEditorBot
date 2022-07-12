const Chalk = require('chalk');
const Moment = require('moment');

const getTimestamp = () => {
    return `[${Moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
}

module.exports = {
    load(content) {
        return console.log(`${getTimestamp()}${Chalk.yellow(`[LOAD]`)} ${content}`);
    },
    ready(content) {
        return console.log(`${getTimestamp()}${Chalk.green(`[READY]`)} ${content}`);
    },
    warn(content) {
        return console.log(`${getTimestamp()}${Chalk.black.bgYellow(`[WARN]`)} ${content}`);
    },
    error(content) {
        return console.log(`${getTimestamp()}${Chalk.red(`[ERR]`)} ${content.stack}`);
    },
    cmd(content) {
        return console.log(`${getTimestamp()}${Chalk.black.bgWhite(`[CMD]`)} ${content}`)
    },
    debug(content) {
        return console.log(`${getTimestamp()}${Chalk.black.bgGreen(`[DEBUG]`)} ${content}`);
    }
}
