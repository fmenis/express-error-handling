'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const logger = require('./utils/logger.util');

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
app.use(function (err, req, res, next) { //jshint ignore:line
	// set locals, only providing error in development
	// res.locals.message = err.message;
	// res.locals.error = req.app.get('env') === 'development' ? err : {};
	logger.error(err);
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;