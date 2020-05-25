'use strict';

const Joi = require('@hapi/joi');
const ClientError = require('../utils/classes/clientError.util');

module.exports = function (options) {
    return function (req, res, next) {

        let validation_result;
        const { endpoint } = options;

        switch (endpoint) {
            case 'getUserById':
                validation_result = _validateGetUserById(req);
                break;
            case 'createUser':
                validation_result = _validateCreateUser(req);
                break;
            case 'updateUser':
                validation_result = _validateUpdateUser(req);
                break;

            case 'deleteUserById':
                validation_result = _validateDeleteUserById(req);
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


const _validateGetUserById = req => {
    const schema = Joi.object({
        id: Joi.string().regex(/^[\w@#$%_-]+$/).required()
    });
    return schema.validate({ id: req.params.id });
};


const _validateCreateUser = req => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required()
    });
    return schema.validate({ name: req.body.name, age: req.body.age });
};


const _validateUpdateUser = req => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        id: Joi.string().regex(/^[\w@#$%_-]+$/).required()
    });
    return schema.validate({ name: req.body.name, age: req.body.age, id: req.params.id });
};


const _validateDeleteUserById = req => {
    const schema = Joi.object({
        id: Joi.string().regex(/^[\w@#$%_-]+$/).required()
    });
    return schema.validate({ id: req.params.id });
};