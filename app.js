'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const clientErrorMap = require('./utils/classes/clientErrorMap.util');
const Response = require('./utils/classes/response.util');
const logger = require('./utils/logger.util');
const ClientError = require('./utils/classes/clientError.util');

const app = express();

app.use(bodyParser.json());
const user_routes = require('./routes/user.route');
app.use('/users', user_routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = createError(404);
	next(err);
});

// error handler
app.use((err, req, res, next) => { //jshint ignore:line
	let error = err;

	// if err is a non predicted error, log it and return a generic internal error to the
	if (err instanceof Error) {
		logger.error(error);
		error = new ClientError('internal')
	}

	const client_error_code = error.code || 'internal';
	const clientError = clientErrorMap[client_error_code];

	const client_error = clientError(error.data);
	const status_code = Object.assign({}, client_error).status;
	delete client_error.status;

	res.status(status_code);
	res.send(new Response({
		status: status_code,
		error: client_error
	}));
});


module.exports = app;