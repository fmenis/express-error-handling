
'use strict';

const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const httpContext = require('express-http-context');


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

//##TODO controllare!
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
 * HACK to save Error object (not requested for plain objects)
 */
logger.error = err => {
    if (err instanceof Object) {
        let message;
        if (err.request_id) {
            message = `request_id: ${err.request_id} ${err.stack || err.stack || err}`;
        } else {
            message = `${err.stack || err.stack || err}`;
        }
        return logger.log({ level: 'error', message: message });
    }
    logger.log({ level: 'error', message: err });
};

/**
 * Format message adding the request id from the CLS
 */
const formatMessage = log => {
    const request_id = httpContext.get('req_id');

    /**
     * Because a the startup server log is made before an incomint http request and so the
     * middleware that add the session have not already done its work
     */
    if (!request_id) {
        return log;
    }

    if (log instanceof Error) {
        log = {
            request_id: request_id,
            message: log.message,
            stack: log.stack
        };
    }

    if (typeof log === 'string') {
        log = `request_id: ${request_id} ${log}`;
    }

    return log;
};


module.exports = {
    error: message => {
        logger.error(formatMessage(message));
    },
    info: message => {
        logger.info(formatMessage(message));
    },
};