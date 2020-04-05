'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const user_routes = require('./routes/user.route');
app.use('/users', user_routes);

app.listen(3000, () => {
    console.log('Server up and running');
});