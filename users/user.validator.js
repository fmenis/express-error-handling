'use strict';

const Joi = require('@hapi/joi');
const logger = require('../utils/logger.util');
const ClientError = require('../utils/classes/clientError.util');

module.exports = function (options) {
    return function (req, res, next) {

        let validation_result;
        const { endpoint } = options;

        switch (endpoint) {
            case 'getUserById':
                validation_result = validateGetUserById(req);
                break;
            case 'createUser':
                validation_result = validateCreateUser(req);
                break;
            case 'updateUser':
                validation_result = validateUpdateUser(req);
                break;

            case 'deleteUserById':
                validation_result = validateDeleteUserById(req);
                break;

            default:
                break;
        }

        if (validation_result.error) {
            const err = new ClientError('invalid_input', { message: validation_result.error });
            return next(err);
        }

        next();
    };
};


const validateGetUserById = req => {
    const schema = Joi.object({
        id: Joi.string().regex(/^[\w@#$%_-]+$/).required()
    });
    return schema.validate({ id: req.params.id });
};


const validateCreateUser = req => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required()
    });
    return schema.validate({ name: req.body.name, age: req.body.age });
};


const validateUpdateUser = req => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required()
    });
    return schema.validate({ name: req.body.name, age: req.body.age });
};


const validateDeleteUserById = req => {
    const schema = Joi.object({
        id: Joi.string().regex(/^[\w@#$%_-]+$/).required()
    });
    return schema.validate({ id: req.params.id });
};