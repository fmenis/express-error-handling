
'use strict';

const clientErrors = {
    internal: () => {
        return {
            status: 500,
            title: 'Internal server error',
            reason: 'Something goes wrong'
        };
    },
    not_found: data => {
        return {
            status: 404,
            title: 'Not found',
            reason: `Resource ${data.resource} with id ${data.id} not found`
        };
    },
    invalid_input: data => {
        return {
            status: 400,
            title: 'Invalid input',
            reason: `Input ${data.input} is not valid`
        };
    },
    // auth
    invalid_credentials: () => {
        return {
            status: 400,
            title: 'Wrong credentials',
            reason: 'Wrong email or password'

        };
    }
};

module.exports = clientErrors;