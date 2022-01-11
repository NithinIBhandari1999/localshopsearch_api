const FormatResponse = require('response-format');

const ObjectId = require('mongoose').Types.ObjectId;
const { DateTime } = require('luxon');

const { trimObject, replaceAll } = require('../../utils/commonFunction');

const customInputValidations = require('../../utils/customInputValidations');
const commonInputReplace = require('../../utils/commonInputReplace');

// Models
const Shop = require('../../models/shop/Shop');
const ShopStatistics = require('../../models/shop/ShopStatistics');

exports.getDashboardStatistics = async (req, res) => {
    try {
        const payloadUserId = req.payload.userId;

        const paramsShopId = req.params.paramsShopId;

        req.body = trimObject(req.body);

        const resultShop = await Shop.findOne({
            _id: new ObjectId(paramsShopId),
            userId: new ObjectId(payloadUserId)
        });

        if (!resultShop) {
            return res.status(400).json(FormatResponse.badRequest('Unauthorzed Access', {}));
        }

        const result = {
            today: 0,
            week: 0,
            month: 0
        }

        const currentDateTime = new Date();

        // Today
        const dateOne = DateTime.fromObject({
            year: currentDateTime.getFullYear(),
            month: currentDateTime.getMonth() + 1,
            day: currentDateTime.getDate()
        }).setZone('Asia/Calcutta').toFormat('yyyy-MM-dd');
        const resultToday = await ShopStatistics.aggregate([
            {
                '$match': {
                    'shopId': new ObjectId(paramsShopId),
                    'createdAt': {
                        '$gt': new Date(dateOne)
                    }
                }
            }, {
                '$count': 'count'
            }
        ]);

        // Get week
        const dateWeek = DateTime.fromObject({
            year: currentDateTime.getFullYear(),
            month: currentDateTime.getMonth() + 1,
            day: currentDateTime.getDate()
        }).setZone('Asia/Calcutta').minus({
            week: 1
        }).toFormat('yyyy-MM-dd');
        const resultWeek = await ShopStatistics.aggregate([
            {
                '$match': {
                    'shopId': new ObjectId(paramsShopId),
                    'createdAt': {
                        '$gt': new Date(dateWeek)
                    }
                }
            }, {
                '$count': 'count'
            }
        ]);

        // Get Month
        const dateMonth = DateTime.fromObject({
            year: currentDateTime.getFullYear(),
            month: currentDateTime.getMonth() + 1,
            day: currentDateTime.getDate()
        }).setZone('Asia/Calcutta').minus({
            month: 1
        }).toFormat('yyyy-MM-dd');
        const resultMonth = await ShopStatistics.aggregate([
            {
                '$match': {
                    'shopId': new ObjectId(paramsShopId),
                    'createdAt': {
                        '$gte': new Date(dateMonth)
                    }
                }
            }, {
                '$count': 'count'
            }
        ]);
        
        if (resultToday.length > 0) {
            result.today = resultToday[0].count;
        }
        if (resultWeek.length > 0) {
            result.week = resultWeek[0].count;
        }
        if (resultMonth.length > 0) {
            result.month = resultMonth[0].count;
        }

        return res.status(200).json(FormatResponse.success(
            'Success',
            {
                result
            }
        ));

    } catch (error) {
        console.error(error);
        return res.status(400).json(FormatResponse.badRequest('Unexpected Error', {}));
    }
};