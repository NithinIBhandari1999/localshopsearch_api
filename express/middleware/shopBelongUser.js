const ObjectId = require('mongoose').Types.ObjectId;

// Models
const Shop = require('../models/shop/Shop');

const shopBelongUser = async (req, res, next) => {

    try {
        const resultShop = await Shop.findOne({
            _id: ObjectId(req.params.paramsShopId),
            userId: ObjectId(req.payload.userId)
        });

        if (!resultShop) {
            return res.status(401).send({ message: 'Unauthorized access -> Shop does not belong' });
        }

        next();
    } catch (error) {
        return res.status(400).send({ message: 'Unexpected Server Error' });
    }



};

module.exports = shopBelongUser;
