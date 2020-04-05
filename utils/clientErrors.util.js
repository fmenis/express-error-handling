
'use strict';

const clientErrors = {
    internal_server_error: () => {
        return {
            status: 500,
            title: 'Internal server error',
            message: 'Something goes wrong'
        };
    },
    not_found: data => {
        return {
            status: 404,
            title: 'Not found',
            message: `Resource ${data.resource} with id ${data.id} not found`
        };
    },
    invalid_inputs: () => {
        return {
            status: 400,
            title: 'Wrong credentials',
            message: 'Wrong email or password'

        };
    }
};

module.exports = clientErrors;