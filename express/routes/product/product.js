const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
	insertOne,
	getAll,
	getById,
	updateById,
	deleteById
} = require('../../controller/product/product');

const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');
const shopBelongUser = require('../../middleware/shopBelongUser');
const checkRequestValidationMiddleware = require('../../middleware/checkRequestValidationMiddleware');

const customInputValidations = require('../../utils/customInputValidations');

router.post(
	'/insertOne/:paramsShopId',
	[
		body('productName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productDescription').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productQuantity').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productUnits').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('priceMrp').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('priceSelling').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	insertOne
);

router.get(
	'/getAll/:paramsShopId',
	[
		param('paramsShopId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		})
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getAll
);

router.get(
	'/getById/:paramsShopId/:paramsProductId',
	[
		param('paramsShopId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		param('paramsProductId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		})
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	getById
);

router.put(
	'/updateById/:paramsShopId/:paramsProductId',
	[
		param('paramsShopId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		param('paramsProductId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),

		body('productName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productDescription').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productQuantity').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('productUnits').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('priceMrp').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('priceSelling').custom(val => {
			const err = customInputValidations.isInputValidGt0(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	updateById
);

router.delete(
	'/deleteById/:paramsShopId/:paramsProductId',
	[
		param('paramsShopId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		param('paramsProductId').custom(val => {
			const err = customInputValidations.isInputValidMongodbId(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	shopBelongUser,
	deleteById
);

module.exports = router;
