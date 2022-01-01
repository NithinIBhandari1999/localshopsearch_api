const protectedRoute = async (req, res, next) => {
    if( req.payload ){
        next();
    } else {
        res.status(401).send({ message: 'unauthorized route' });
    }
};

module.exports = protectedRoute;