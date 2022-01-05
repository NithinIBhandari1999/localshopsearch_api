const FormatResponse = require('response-format');

// Models
const User = require('../../models/user/User');

exports.getProfileInfo = async (req, res) => {
	try {
		const { userId } = req.payload;

		const resultUserInfo = await User.findOne({
			_id: userId,
		});

		if (!resultUserInfo) {
			return res.status(400).json(FormatResponse.badRequest('Account does not exist.', {}));
		}

		return res.status(200).json(
			FormatResponse.success('Your Account Detail', {
				resultUserInfo,
			})
		);
	} catch (error) {
		return res.status(400).json(FormatResponse.badRequest(error.message, {}));
	}
};

exports.updateProfileInfo = async (req, res) => {
	try {
		const { userId } = req.payload;

		const {
			name
		} = req.body;

		await User.updateOne(
			{
				_id: userId,
			},
			{
				$set: {
					name
				},
			},
			{
				new: true,
			}
		);

		return res.status(200).json(FormatResponse.success('Updated Successfully', {}));
	} catch (error) {
		return res.status(400).json(FormatResponse.badRequest(error.message, {}));
	}
};
