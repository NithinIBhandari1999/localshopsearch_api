const FormatResponse = require('response-format');

const ObjectId = require('mongoose').Types.ObjectId;

const { trimObject } = require('../../utils/commonFunction');

const commonInputReplace = require('../../utils/commonInputReplace');

// Models
const Product = require('../../models/product/Product');
const Shop = require('../../models/shop/Shop');

const getProductUniqueUrl = async (shopId, uniqueUrl) => {
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

		const result = await Product.countDocuments({
			shopId: new ObjectId(shopId),
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

const getKeywordIndex = (keywordArray) => {
	try {
		let keywordIndex = '';

		keywordArray.forEach((item) => {
			try {
				keywordIndex = `${keywordIndex}${item?.toString()} `;
			} catch (error) {
				console.error(error);
			}
		});

		keywordIndex = keywordIndex.toLowerCase();

		keywordIndex = keywordIndex.replaceAll('.', ' ');

		keywordIndex = keywordIndex.replaceAll('  ', ' ');
		keywordIndex = keywordIndex.replaceAll('  ', ' ');
		keywordIndex = keywordIndex.replaceAll('  ', ' ');

		let keywordIndexArray = keywordIndex.split(' ');
		const keywordIndexNewArray = keywordIndexArray.filter((elem, pos) => {
			return keywordIndexArray.indexOf(elem) == pos;
		});

		keywordIndex = '';

		keywordIndexNewArray.forEach((item) => {
			try {
				if (item && item !== '.') {
					keywordIndex = `${keywordIndex.toString()}${item.toString()} `;
				}
			} catch (error) {
				console.error(error);
			}
		});

		return keywordIndex;

	} catch (error) {
		console.error(error);
		return '';
	}
};

// Desc: Product -> List
exports.getAll = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;
		const paramsShopId = req.params.paramsShopId;

		req.body = trimObject(req.body);

		const match = {
			userId: ObjectId(payloadUserId),
			shopId: ObjectId(paramsShopId)
		};

		const resultProduct = await Product.find(match);

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				results: resultProduct
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

// Desc: Product -> Add
exports.insertOne = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;
		const paramsShopId = req.params.paramsShopId;

		req.body = trimObject(req.body);

		const {
			productName,
			productDescription,
			productQuantity,
			productUnits,
			priceMrp,
			priceSelling,

			imageList
		} = req.body;

		const uniqueUrl = await getProductUniqueUrl(paramsShopId, productName);

		const shopInfo = await Shop.findOne({
			_id: ObjectId(paramsShopId)
		});

		const insert = {
			userId: ObjectId(payloadUserId),
			shopId: ObjectId(paramsShopId),

			productName,
			productDescription,
			productQuantity,
			productUnits,
			priceMrp,
			priceSelling,

			uniqueUrl,

			imageList,

			keywordIndex: '',

			shopInfo: {
				geolocation: shopInfo.geolocation,

				shopDescription: shopInfo.shopDescription,
				addressFull: shopInfo.addressFull,

				countryName: shopInfo.countryName,
				stateName: shopInfo.stateName,
				cityName: shopInfo.cityName,
				localityName: shopInfo.localityName,

				googleMapEmbedLink: shopInfo.googleMapEmbedLink,

				phoneNumber: shopInfo.phoneNumber,
				whatsappNumber: shopInfo.whatsappNumber,

				uniqueUrl: shopInfo.uniqueUrl,

				shopName: shopInfo.shopName,
			}
		};

		try {
			insert.keywordIndex = getKeywordIndex([
				insert.productName,
				insert.productDescription,
				insert.productUnits,
				insert.shopInfo.cityName,
				insert.shopInfo.stateName,
				insert.shopInfo.countryName,
				insert.shopInfo.localityName,
				insert.shopInfo.shopName,
				insert.shopInfo.shopDescription,
				insert.shopInfo.phoneNumber,
				insert.shopInfo.whatsappNumber,
			]);
		} catch (error) {
			console.log({
				keywordIndexError: error
			});
			console.error(error);
		}

		console.log({
			keywordIndex: insert.keywordIndex
		});

		const newProduct = await Product.create(insert);

		return res.status(200).json(FormatResponse.success(
			'Product Added Successfully',
			{
				result: newProduct
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('', {}));
	}
};

// Desc: Product -> Get By Id
exports.getById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;
		const paramsShopId = req.params.paramsShopId;

		const paramsProductId = req.params.paramsProductId;

		req.body = trimObject(req.body);

		const match = {
			_id: ObjectId(paramsProductId),
			userId: ObjectId(payloadUserId),
			shopId: ObjectId(paramsShopId)
		};

		const resultProduct = await Product.findOne(match);

		if (!resultProduct) {
			return res.status(400).json(FormatResponse.badRequest('Does not exist.', {}));
		}

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: resultProduct
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

// Desc: Product -> Delete By Id
exports.deleteById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;
		const paramsShopId = req.params.paramsShopId;

		const paramsProductId = req.params.paramsProductId;

		const match = {
			_id: ObjectId(paramsProductId),
			userId: ObjectId(payloadUserId),
			shopId: ObjectId(paramsShopId)
		};

		const resultProduct = await Product.deleteOne(match);

		if (resultProduct.deletedCount !== 1) {
			return res.status(400).json(FormatResponse.badRequest('Product does not exist.', {}));
		}

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: {
					deletedCount: resultProduct.deletedCount
				}
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};

// Desc: Product -> Update By Id
exports.updateById = async (req, res) => {
	try {
		const payloadUserId = req.payload.userId;
		const paramsShopId = req.params.paramsShopId;
		const paramsProductId = req.params.paramsProductId;

		req.body = trimObject(req.body);

		const {
			productDescription,
			productQuantity,
			productUnits,
			priceMrp,
			priceSelling,

			imageList
		} = req.body;

		const match = {
			_id: ObjectId(paramsProductId),
			userId: ObjectId(payloadUserId),
			shopId: ObjectId(paramsShopId)
		};

		const shopInfo = await Shop.findOne({
			_id: new ObjectId(paramsShopId)
		});

		const update = {
			productDescription,
			productQuantity,
			productUnits,
			priceMrp,
			priceSelling,

			imageList,

			keywordIndex: '',

			shopInfo: {
				geolocation: shopInfo.geolocation,

				shopDescription: shopInfo.shopDescription,
				addressFull: shopInfo.addressFull,

				countryName: shopInfo.countryName,
				stateName: shopInfo.stateName,
				cityName: shopInfo.cityName,
				localityName: shopInfo.localityName,

				googleMapEmbedLink: shopInfo.googleMapEmbedLink,

				phoneNumber: shopInfo.phoneNumber,
				whatsappNumber: shopInfo.whatsappNumber,

				uniqueUrl: shopInfo.uniqueUrl,

				shopName: shopInfo.shopName,
			}
		};

		try {
			update.keywordIndex = getKeywordIndex([
				update.productName,
				update.productDescription,
				update.productUnits,
				update.shopInfo.cityName,
				update.shopInfo.stateName,
				update.shopInfo.countryName,
				update.shopInfo.localityName,
				update.shopInfo.shopName,
				update.shopInfo.shopDescription,
				update.shopInfo.phoneNumber,
				update.shopInfo.whatsappNumber,
			]);
		} catch (error) {
			console.error(error);
		}

		const resultProduct = await Product.findByIdAndUpdate(
			match,
			update,
			{
				new: true
			}
		);

		return res.status(200).json(FormatResponse.success(
			'Success',
			{
				result: resultProduct
			}
		));

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
	}
};
