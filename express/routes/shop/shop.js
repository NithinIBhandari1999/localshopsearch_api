const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');

const {
	insertOne,
	getAll,
	getById,
	updateById,
	deleteById
} = require('../../controller/shop/shop');

const verifyJwt = require('../../middleware/verifyJwt');
const protectedRouteUser = require('../../middleware/protectedRouteUser');
const shopBelongUser = require('../../middleware/shopBelongUser');
const checkRequestValidationMiddleware = require('../../middleware/checkRequestValidationMiddleware');

const customInputValidations = require('../../utils/customInputValidations');

router.post(
	'/insertOne',
	[
		body('shopName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('shopDescription').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('addressFull').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),

		body('countryName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('stateName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('cityName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('localityName').custom(val => {
			const err = customInputValidations.isInputEmpty(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),

		body('phoneNumber').custom(val => {
			const err = customInputValidations.isInputPhoneNumberValid(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('whatsappNumber').custom(val => {
			const err = customInputValidations.isInputPhoneNumberValid(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),

		body('latitude').custom(val => {
			const err = customInputValidations.isInputValidLatitude(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
		body('longitude').custom(val => {
			const err = customInputValidations.isInputValidLongitude(val);
			if (err !== '') {
				throw new Error(err);
			}
			return true;
		}),
	],
	checkRequestValidationMiddleware,
	verifyJwt,
	protectedRouteUser,
	insertOne
);

router.get(
	'/getAll',
	verifyJwt,
	protectedRouteUser,
	getAll
);

router.get(
	'/getById/:paramsShopId',
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
	getById
);

router.put(
	'/updateById/:paramsShopId',
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
	updateById
);

router.post(
	'/deleteById/:paramsShopId',
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
	deleteById
);

module.exports = router;
