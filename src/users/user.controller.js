'use strict';

const userService = require('./user.service');
const logger = require('../utils/logger.util');
const ClientError = require('../utils/classes/clientError.util');
const Response = require('../utils/classes/response.util');


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(new Response({
            success: true,
            data: { users }
        }));
    } catch (error) {
        next(error);
    }
};


module.exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.send(new Response({
            success: true,
            data: { user }
        }));
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

        await userService.createUser(name, age);
        res.send(new Response({ success: true, status: 201 }));

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

        await userService.updateUser(id, name, age);
        res.send(new Response({ success: true }));

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
        res.send(new Response({ success: true }));

    } catch (error) {
        next(error);
    }
};