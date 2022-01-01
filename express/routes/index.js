// Imports
const FormatResponse = require('response-format');
const express = require('express');

const router = express.Router();

router.use('/test', require('./test/index'));
router.use('/global', require('./global/index'));

router.use('/shop', require('./shop/index'));
router.use('/product', require('./product/index'));
router.use('/user', require('./user/index'));
router.use('/common', require('./common/index'));

router.get('/', (req, res) => {
	try {
		return res.json(FormatResponse.success('LocalShopSearch.com is working.', {}));
	} catch (error) {
		console.error(error);
		return res.json(FormatResponse.badRequest('LocalShopSearch.com has error.', {}));
	}
});

module.exports = router;
