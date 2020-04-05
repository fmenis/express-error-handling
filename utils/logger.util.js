
'use strict';

const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');


const logDir = path.join('./logs');
const transportsList = [];

const combinedFileTransport = new transports.DailyRotateFile({
    level: 'verbose',
    format: format.json(),
    dirname: `${logDir}`,
    filename: `%DATE%-combined.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    zippedArchive: true,
    maxFiles: '365d'
});
transportsList.push(combinedFileTransport);


const errorFileTransport = new transports.DailyRotateFile({
    level: 'error',
    format: format.json(),
    dirname: `${logDir}`,
    filename: `%DATE%-error.log`,
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    zippedArchive: true,
    maxFiles: '365d'
});
transportsList.push(errorFileTransport);


const exceptionHandlers = new transports.File({
    filename: `${logDir}/exceptions.log`,
    format: format.json(),
});


if (process.env.NODE_ENV !== 'production') {
    const consoleTransport = new transports.Console({
        level: 'silly',
        format: format.combine(
            format.colorize(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    });
    transportsList.push(consoleTransport);
}


const loggerConfigs = {
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: transportsList,
    exceptionHandlers: exceptionHandlers
};

const logger = createLogger(loggerConfigs);

/**
 * HACK
 */
logger.error = err => {
    if (err instanceof Error) {
        return logger.log({ level: 'error', message: `${err.stack || err.stack || err}` });
    } 
    logger.log({ level: 'error', message: err });
};

module.exports = logger;