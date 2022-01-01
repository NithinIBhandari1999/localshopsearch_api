const protectedRouteUser = async (req, res, next) => {
    if (req.payload.userType === 'user') {
      next();
    } else {
      res.status(401).send({ message: 'unauthorized route' });
    }
  };
  
  module.exports = protectedRouteUser;
  