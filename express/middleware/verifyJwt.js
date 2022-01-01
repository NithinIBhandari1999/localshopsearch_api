const FormatResponse = require('response-format');
const { verifyUserJwtToken } = require('../utils/jwtFunction');

const verifyJwt = async (req, res, next) => {
	if (req.cookies.jwtToken === undefined || req.cookies.jwtToken === null || req.cookies.jwtToken === '') {
		return res.status(401).json(FormatResponse.success('Invalid Token', {}));
	}

	try {
		req.payload = await verifyUserJwtToken(req.cookies.jwtToken);
		if (req.payload === false) {
			return res.status(401).json(FormatResponse.success('Invalid Token', {}));
		}
		next();
	} catch (err) {
		return res.status(401).json(FormatResponse.success('Invalid Token', {}));
	}
};

module.exports = verifyJwt;
