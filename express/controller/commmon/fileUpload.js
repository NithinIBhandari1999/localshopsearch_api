const FormatResponse = require('response-format');
const ImageKit = require('imagekit');

const envConstant = require('../../config/envConstant')

exports.getImageKitAuth = async (req, res) => {
	try {

		const imagekit = new ImageKit({
			publicKey: envConstant.IMAGEKIT_PUBLICKEY,
			privateKey: envConstant.IMAGEKIT_PRIVATEKEY,
			urlEndpoint: `https://ik.imagekit.io/${envConstant.IMAGEKIT_ID}/`
		});

		const authenticationParameters = imagekit.getAuthenticationParameters();

		return res.status(200).json(authenticationParameters);
	} catch (error) {
		return res.status(400).json(FormatResponse.badRequest(error.message, {}));
	}
};
