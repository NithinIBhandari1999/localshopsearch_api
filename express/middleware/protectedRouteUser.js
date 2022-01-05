const FormatResponse = require('response-format');

const protectedRouteUser = async (req, res, next) => {
  if (req.payload.userType === 'user') {
    next();
  } else {
    return res.status(401).json(
      FormatResponse.unAuthorized('Unauthorized access', {})
    );
  }
};

module.exports = protectedRouteUser;
