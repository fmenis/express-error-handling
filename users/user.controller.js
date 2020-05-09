'use strict';

const userService = require('./user.service');
const logger = require('../utils/logger.util');
const ClientError = require('../utils/classes/clientError.util');


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        next(error);
    }
};


module.exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.send(user);
    } catch (error) {
        next(error);
    }
};


module.exports.createUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;

        if (!name) {
            logger.error(new Error(`[Users] input 'name' not provided`));
            throw new ClientError('invalid_input', { input: 'name' });
        }

        if (!age) {
            logger.error(new Error(`[Users] input 'age' not provided`));
            throw new ClientError('invalid_input', { input: 'age' });
        }

        const user = await userService.createUser(name, age);
        res.send(user);

    } catch (error) {
        next(error);
    }
};


module.exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            logger.error(new Error(`[Users] input 'id' not provided`));
            throw new ClientError('invalid_input', { input: 'id' });
        }

        const { name, age } = req.body;
        if (!name) {
            logger.error(new Error(`[Users] input 'name' not provided`));
            throw new ClientError('invalid_input', { input: 'name' });
        }

        if (!age) {
            logger.error(new Error(`[Users] input 'age' not provided`));
            throw new ClientError('invalid_input', { input: 'age' });
        }

        const user = await userService.updateUser(id, name, age);
        res.send(user);

    } catch (error) {
        next(error);
    }
};


module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            logger.error(new Error(`[Users] input 'id' not provided`));
            throw new ClientError('invalid_input', { input: 'id' });
        }

        await userService.deleteUserById(id);
        res.send();

    } catch (error) {
        next(error);
    }
};