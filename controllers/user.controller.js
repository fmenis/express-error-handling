'use strict';

const userService = require('../services/user.service');
const logger = require('../utils/logger.util');

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        logger.error('[Users] error during users retrivment');
        next(error);
    }
};


module.exports.getUserById = async (req, res, next) => {

    const id = req.params.id;
    if (!id) {
        //##TODO
    }

    const user = await userService.getUserById(id);
    res.send(user);
};


module.exports.createUser = async (req, res, next) => {
    const { name, age } = req.body;
    if (!name || !age) {
        //##TODO
    }

    await userService.createUser(name, age);
    res.send('OK');
};


module.exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        //##TODO
    }
    const { name, age } = req.body;
    if (!id || !name || !age) {
        //##TODO
    }

    await userService.updateUser(id, name, age);
    res.send('OK');
};


module.exports.deleteUserById = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        //##TODO
    }

    await userService.deleteUserById(id);
    res.send('OK');
};