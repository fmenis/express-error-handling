
'use strict';

const httpContext = require('express-http-context');
const shortid = require('shortid');

/**
 * Add an identifier for every request
 */
const contextifyRequest = (req, res, next) => {
    httpContext.set('req_id', shortid.generate());
    next();
};

module.exports = contextifyRequest;