const FormatResponse = require('response-format');

// Models
const User = require('../../models/user/User');

const getAuthStatus = async (userType, userInfo) => {
	const authStatus = {
		statusIsLoggedIn: 'true',
		userType: userType,
		statusEmailVerified: userInfo.statusEmailVerified,

		userId: userInfo._id,
		userFullName: userInfo.name,
		userEmail: userInfo.email,
	};

	return authStatus;
};

exports.validateSession = async (req, res) => {
	try {
		const payload = req.payload;

		const userInfo = await User.findOne({
			_id: payload.userId,
		});

		if (!userInfo) {
			return res.status(400).json(FormatResponse.badRequest('Account does not exist.', {}));
		}

		const authStatus = await getAuthStatus(req.payload.userType, userInfo);

		return res.status(200).json(
			FormatResponse.success('Success', {
				authStatus: authStatus,
			})
		);
	} catch (error) {
		return res.status(400).json(FormatResponse.badRequest(error.message, {}));
	}
};

exports.getAuthStatus = getAuthStatus;