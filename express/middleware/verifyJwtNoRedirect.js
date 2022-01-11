const { verifyUserJwtToken } = require('../utils/jwtFunction');

const verifyJwt = async (req, res, next) => {
	if (req.cookies.jwtToken === undefined || req.cookies.jwtToken === null || req.cookies.jwtToken === '') {
		next();
		return;
	}

	try {
		req.payload = await verifyUserJwtToken(req?.cookies?.jwtToken);
		next();
		return;
	} catch (err) {
		next();
		return;
	}
};

module.exports = verifyJwt;
