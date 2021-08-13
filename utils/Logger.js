const Chalk = require('chalk');
const Moment = require('moment');

class Logger {
    static log(content, type = 'log') {
        const timestamp = `[${Moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
        switch (type) {
            case 'log': {
                return console.log(`${timestamp}${Chalk.blue(`[${type.toUpperCase()}]`)} ${content}`);
            }
            case 'warn': {
                return console.log(`${timestamp}${Chalk.black.bgYellow(`[${type.toUpperCase()}]`)} ${content}`);
            }
            case 'error': {
                return console.log(`${timestamp}${Chalk.red(`[${type.toUpperCase()}]`)} ${content.stack}`);
            }
            case 'debug': {
                return console.log(`${timestamp}${Chalk.black.bgGreen(`[${type.toUpperCase()}]`)} ${content}`);
            }
            case 'cmd': {
                return console.log(`${timestamp}${Chalk.black.bgWhite(`[${type.toUpperCase()}]`)} ${content}`);
            }
            case 'ready': {
                return console.log(`${timestamp}${Chalk.green(`[${type.toUpperCase()}]`)} ${content}`);
            }
            case 'load': {
                return console.log(`${timestamp}${Chalk.yellow(`[${type.toUpperCase()}]`)} ${content}`);
            }
            default: throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
        }
    }

    static error(content) {
        return this.log(content, 'error');
    }

    static warn(content) {
        return this.log(content, 'warn');
    }

    static debug(content) {
        return this.log(content, 'debug');
    }

    static cmd(content) {
        return this.log(content, 'cmd');
    }

    static load(content) {
        return this.log(content, 'load');
    }

    static testLog(content) {
        return this.log(content, 'log');
    }
}

module.exports = Logger;
