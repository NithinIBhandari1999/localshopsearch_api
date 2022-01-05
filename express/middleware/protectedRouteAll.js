const FormatResponse = require('response-format');

const protectedRoute = async (req, res, next) => {
    if (req.payload) {
        next();
    } else {
        return res.status(401).json(
            FormatResponse.unAuthorized('Unauthorized access', {})
        );
    }
};

module.exports = protectedRoute;