const FormatResponse = require('response-format');

const ObjectId = require('mongoose').Types.ObjectId;

const { trimObject } = require('../../utils/commonFunction');

const customInputValidations = require('../../utils/customInputValidations');
const commonInputReplace = require('../../utils/commonInputReplace');

// Models
const Shop = require('../../models/shop/Shop');
const Product = require('../../models/product/Product');

// Desc: Shop -> List
exports.getAll = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;

		req.body = trimObject(req.body);

		const match = {
			userId: ObjectId(payloadUserId)
		};

		const resultShop = await Shop.find(match);

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				results: resultShop
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

const getShopUniqueUrl = async (uniqueUrl) => {
	try {
		let tempUniqueUrl = uniqueUrl;

		tempUniqueUrl = tempUniqueUrl.replaceAll('  ', ' ');
		tempUniqueUrl = tempUniqueUrl.replaceAll('  ', ' ');
		tempUniqueUrl = tempUniqueUrl.replaceAll('  ', ' ');
		tempUniqueUrl = tempUniqueUrl.replaceAll('  ', ' ');

		tempUniqueUrl = uniqueUrl.toLowerCase();

		tempUniqueUrl = commonInputReplace.filterUniqueUrl(tempUniqueUrl);

		tempUniqueUrl = tempUniqueUrl.replaceAll('--', '-');
		tempUniqueUrl = tempUniqueUrl.replaceAll('--', '-');
		tempUniqueUrl = tempUniqueUrl.replaceAll('--', '-');
		tempUniqueUrl = tempUniqueUrl.replaceAll('--', '-');

		const result = await Shop.countDocuments({
			uniqueUrl: new RegExp(tempUniqueUrl, 'i')
		});

		if (result === 0) {
			return tempUniqueUrl;
		}

		if (result !== 0) {
			return `${tempUniqueUrl}-${result + 1}`;
		}

		return tempUniqueUrl;
	} catch (error) {
		return uniqueUrl;
	}
};

// Desc: Shop -> Add
exports.insertOne = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;

		req.body = trimObject(req.body);

		const {
			shopName,
			shopDescription,

			addressFull,
			countryName,
			stateName,
			cityName,
			localityName,
			googleMapEmbedLink,

			phoneNumber,
			whatsappNumber,

			latitude,
			longitude,

			imageList
		} = req.body;

		const uniqueUrl = await getShopUniqueUrl(`${shopName}-${localityName}-${cityName}`);

		const insert = {
			userId: ObjectId(payloadUserId),

			shopName,
			shopDescription,

			addressFull,
			countryName,
			stateName,
			cityName,
			localityName,
			googleMapEmbedLink,

			phoneNumber,
			whatsappNumber,

			uniqueUrl,

			geolocation: {
				type: 'Point',
				coordinates: [0.0, 0.0],
			},

			imageList
		};

		if (
			customInputValidations.isInputValidLatitude(latitude) === '' &&
			customInputValidations.isInputValidLongitude(longitude) === ''
		) {
			const geolocationObj = {
				type: 'Point',
				coordinates: [longitude, latitude],
			};
			insert.geolocation = geolocationObj;
		}

		const newShop = await Shop.create(insert);

		return res.status(200).json(FormatResponse.success(
			'Shop Added Successfully',
			{
				result: newShop
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('', {}));
	}
};

// Desc: Shop -> Get By Id
exports.getById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;

		const paramsShopId = req.params.paramsShopId;

		req.body = trimObject(req.body);

		const match = {
			_id: ObjectId(paramsShopId),
			userId: ObjectId(payloadUserId),
		};

		const resultShop = await Shop.findOne(match);

		if (!resultShop) {
			return res.status(400).json(FormatResponse.badRequest('Does not exist.', {}));
		}

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: resultShop
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

// Desc: Shop -> Delete
exports.deleteById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;

		const paramsShopId = req.params.paramsShopId;

		const match = {
			_id: ObjectId(paramsShopId),
			userId: ObjectId(payloadUserId),
		};

		const resultShop = await Shop.deleteOne(match);

		if (resultShop.deletedCount !== 1) {
			return res.status(400).json(FormatResponse.badRequest('Shop does not exist.', {}));
		}

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: {
					deletedCount: resultShop.deletedCount
				}
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

// Desc: Shop -> Update
exports.updateById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;

		const paramsShopId = req.params.paramsShopId;

		req.body = trimObject(req.body);

		const {
			shopDescription,

			addressFull,
			googleMapEmbedLink,

			phoneNumber,
			whatsappNumber,

			imageList,

			latitude,
			longitude
		} = req.body;

		const match = {
			_id: ObjectId(paramsShopId),
			userId: ObjectId(payloadUserId),
		};

		const update = {
			userId: ObjectId(payloadUserId),

			shopDescription,

			addressFull,
			googleMapEmbedLink,

			phoneNumber,
			whatsappNumber,

			imageList,

			geolocation: {
				type: 'Point',
				coordinates: [0.0, 0.0],
			},
		};

		if (
			customInputValidations.isInputValidLatitude(latitude) === '' &&
			customInputValidations.isInputValidLongitude(longitude) === ''
		) {
			const geolocationObj = {
				type: 'Point',
				coordinates: [longitude, latitude],
			};
			update.geolocation = geolocationObj;
		}

		const resultShop = await Shop.findByIdAndUpdate(match, update, {
			new: true
		});

		console.log({
			resultShop
		});

		const shopInfo = {
			shopName: resultShop.shopName,
			shopDescription: resultShop.shopDescription,

			geolocation: resultShop.shopName,

			addressFull: resultShop.addressFull,
			countryName: resultShop.countryName,
			stateName: resultShop.stateName,
			cityName: resultShop.cityName,
			localityName: resultShop.localityName,
			googleMapEmbedLink: resultShop.shopName,

			phoneNumber: resultShop.phoneNumber,
			whatsappNumber: resultShop.whatsappNumber,

			uniqueUrl: resultShop.uniqueUrl
		};

		await Product.updateMany(
			{
				userId: new ObjectId(payloadUserId),
				shopId: new ObjectId(paramsShopId)
			},
			{
				$set: {
					shopInfo
				}
			}
		);

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: resultShop,
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};
