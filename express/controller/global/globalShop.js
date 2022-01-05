const FormatResponse = require('response-format');

const Shop = require('../../models/shop/Shop');
const Product = require('../../models/product/Product');

const customInputValidations = require('../../utils/customInputValidations');

const getAggregateStageSearch = (polygonCoords, query) => {
	try {
		const stageSearch = [];

		let coordinates = [];
		let isValidCoordinates = false;
		if (polygonCoords) {
			if (
				customInputValidations.isInputValidLongitude(polygonCoords?.NW?.longitude) === '' &&
				customInputValidations.isInputValidLongitude(polygonCoords?.NE?.longitude) === '' &&
				customInputValidations.isInputValidLongitude(polygonCoords?.SW?.longitude) === '' &&
				customInputValidations.isInputValidLongitude(polygonCoords?.NW?.longitude) === '' &&
				customInputValidations.isInputValidLatitude(polygonCoords?.NW?.latitude) === '' &&
				customInputValidations.isInputValidLatitude(polygonCoords?.NE?.latitude) === '' &&
				customInputValidations.isInputValidLatitude(polygonCoords?.SW?.latitude) === '' &&
				customInputValidations.isInputValidLatitude(polygonCoords?.SE?.latitude) === ''
			) {
				isValidCoordinates = true;

				coordinates = [
					[polygonCoords.NW.longitude, polygonCoords.NW.latitude],
					[polygonCoords.NE.longitude, polygonCoords.NE.latitude],
					[polygonCoords.SW.longitude, polygonCoords.SW.latitude],
					[polygonCoords.SE.longitude, polygonCoords.SE.latitude],
					[polygonCoords.NW.longitude, polygonCoords.NW.latitude],
				];
			} else {
				isValidCoordinates = false;
			}
		}

		if (query !== '') {
			stageSearch.push({
				'autocomplete': {
					'query': `${query}`,
					'path': 'keywordIndex',
					'fuzzy': {
						'maxEdits': 2,
						'prefixLength': 3
					}
				}
			});
		}

		if (isValidCoordinates) {
			stageSearch.push({
				'geoWithin': {
					'geometry': {
						'type': 'Polygon',
						'coordinates': [coordinates],
					},
					'path': 'shopInfo.geolocation'
				}
			});
		}

		return stageSearch;

	} catch (error) {
		return [];
	}
};

exports.searchProduct = async (req, res) => {
	try {
		const { polygonCoords, query } = req.body;

		// Aggregate
		const pipeline = [];

		// stage -> Stage to search product by location or query or both
		const stageSearchArray = getAggregateStageSearch(polygonCoords, query);
		if (stageSearchArray.length > 0) {
			pipeline.push({
				'$search': {
					'index': 'productSearchIndex',
					'compound': {
						'must': stageSearchArray
					}
				}
			});
		}



		// stage -> Stage to allow only one product
		pipeline.push({
			'$group': {
				'_id': '$shopId',
				'productList': {
					'$push': '$$ROOT'
				}
			}
		});

		// stage -> Limit to 50 products and only one product per shop and remove unwanted variables
		pipeline.push({
			$limit: 50,
		});
		// stage -> only one product per shop
		pipeline.push({
			'$project': {
				'productInfo': {
					'$arrayElemAt': [
						'$productList',
						0
					]
				}
			}
		});

		// stage -> remove unwanted variables
		pipeline.push({
			'$project': {
				'productInfo.keywordIndex': 0,
				'_id': 0
			}
		});

		// stage -> replace root
		pipeline.push({
			'$replaceRoot': {
				'newRoot': '$productInfo'
			}
		});

		console.log(JSON.stringify(pipeline));

		const result = await Product.aggregate(pipeline);

		return res.status(200).json(
			FormatResponse.success('Success', {
				result,
			})
		);

	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest('Something went wrong', {}));
	}
};

exports.getShopInfoById = async (req, res) => {
	try {
		const { uniqueUrl } = req.params;

		const resultShopInfo = await Shop.aggregate([
			{
				$match: {
					uniqueUrl: uniqueUrl,
				},
			},
			{
				$lookup: {
					from: 'ProductList',
					localField: '_id',
					foreignField: 'shopId',
					as: 'productList',
				},
			},
		]);

		if (resultShopInfo.length === 0) {
			return res.status(400).json(FormatResponse.badRequest('Shop does not exist.', {}));
		}

		return res.status(200).json(
			FormatResponse.success('Shop Detail', {
				resultShopInfo: resultShopInfo[0],
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(400).json(FormatResponse.badRequest(error.message, {}));
	}
};
