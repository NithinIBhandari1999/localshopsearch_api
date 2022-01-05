const FormatResponse = require('response-format');
const { validationResult } = require('express-validator');

const checkRequestValidationMiddleware = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(401).json(
            FormatResponse.unAuthorized('Please enter all fields.', {
                result
            })
        );
    }
    next();
};

module.exports = checkRequestValidationMiddleware;