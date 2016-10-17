import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            name: 'error-file',
            level: 'error',
            filename: path.join(logDirectory, 'error_sensors-api.log'),
            handleExceptions: true,
            humanReadableUnhandledException: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            json: true,
            colorize: false
        }),
        new winston.transports.File({
            name: 'info-file',
            level: 'info',
            filename: path.join(logDirectory, 'info_sensors-api.log'),
            maxsize: 5242880, //5MB
            handleExceptions: false,
            maxFiles: 5,
            json: true,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: false,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

export default logger;