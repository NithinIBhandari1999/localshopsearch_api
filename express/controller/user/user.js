const FormatResponse = require('response-format');

const customInputValidations = require('../../utils/customInputValidations');

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

// TODO: Include Filter
exports.updateProfileInfo = async (req, res) => {
	try {
		const { userId } = req.payload;

		const filteredBody = req.body;

		if (
			customInputValidations.isInputValidLatitude(filteredBody.latitude) === '' &&
			customInputValidations.isInputValidLongitude(filteredBody.longitude) === ''
		) {
			const geolocationObj = {
				type: 'Point',
				coordinates: [filteredBody.longitude, filteredBody.latitude],
			};
			filteredBody.geolocation = geolocationObj;
		}

		await User.updateOne(
			{
				_id: userId,
			},
			{
				$set: {
					...filteredBody,
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
