'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const clientErrors = require('./utils/clientErrors.util');
const Response = require('./utils/response.util');

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
	const client_error_code = err.code || 'internal';
	const clientError = clientErrors[client_error_code];

	const error = clientError(err.data);
	const status_code = Object.assign({}, error).status;
	delete error.status;

	res.status(status_code);
	res.send(new Response({
		status: status_code,
		error: error
	}));
});


module.exports = app;