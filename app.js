'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const logger = require('./utils/logger.util');
global.logger = logger;

app.use(bodyParser.json());
const user_routes = require('./routes/user.route');
app.use('/users', user_routes);

app.listen(port, () => {
    console.log(`Server up and running at port ${port} (${process.env.NODE_ENV})`);
});