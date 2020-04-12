'use strict';

const userService = require('../services/user.service');
const logger = require('../utils/logger.util');
const CustomError = require('../utils/customError.util');
const Response = require('../utils/response.util');

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.send(new Response({
            success: true,
            data: { users }
        }));
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error);
            return next(new CustomError('internal'));
        }
        next(error);
    }
};


module.exports.getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) {
            logger.error(new Error(`[Users] input 'id' not provided`));
            throw new CustomError('invalid_input', { input: 'id' });
        }

        const user = await userService.getUserById(id);
        res.send(new Response({
            success: true,
            data: { user }
        }));

    } catch (error) {
        if (error instanceof Error) {
            logger.error(error);
            return next(new CustomError('internal'));
        }
        next(error);
    }
};


module.exports.createUser = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        if (!name) {
            logger.error(new Error(`[Users] input 'name' not provided`));
            throw new CustomError('invalid_input', { input: 'name' });
        }

        if (!age) {
            logger.error(new Error(`[Users] input 'age' not provided`));
            throw new CustomError('invalid_input', { input: 'age' });
        }

        await userService.createUser(name, age);
        res.send(new Response({ success: true }));

    } catch (error) {
        if (error instanceof Error) {
            logger.error(error);
            return next(new CustomError('internal'));
        }
        next(error);
    }
};


module.exports.updateUser = async (req, res, next) => {
    try {

        const { id } = req.params;
        if (!id) {
            logger.error(new Error(`[Users] input 'id' not provided`));
            throw new CustomError('invalid_input', { input: 'id' });
        }

        const { name, age } = req.body;
        if (!name) {
            logger.error(new Error(`[Users] input 'name' not provided`));
            throw new CustomError('invalid_input', { input: 'name' });
        }

        if (!age) {
            logger.error(new Error(`[Users] input 'age' not provided`));
            throw new CustomError('invalid_input', { input: 'age' });
        }

        await userService.updateUser(id, name, age);
        res.send(new Response({ success: true }));

    } catch (error) {
        if (error instanceof Error) {
            logger.error(error);
            return next(new CustomError('internal'));
        }
        next(error);
    }
};


module.exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            logger.error(new Error(`[Users] input 'id' not provided`));
            throw new CustomError('invalid_input', { input: 'id' });
        }
    
        await userService.deleteUserById(id);
        res.send(new Response({ success: true }));
        
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error);
            return next(new CustomError('internal'));
        }
        next(error);
    }
};