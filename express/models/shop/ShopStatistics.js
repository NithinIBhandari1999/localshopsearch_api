const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema.Types;

const ShopStatisticsSchema = new mongoose.Schema(
    {
        shopId: {
            type: ObjectId,
        },

        userId: {
            type: ObjectId,
        },

        ipAddress: {
            type: String
        },

        createdOnYyyyMmDd: {
            type: String,
            default: ''
        }
    },
    {
        collection: 'ShopStatistics',
        timestamps: true,
    }
);

ShopStatisticsSchema.index(
    {
        createdOnYyyyMmDd: 1,
        shopId: 1,
        userId: 1,
        ipAddress: 1,
    },
    {
        unique: true
    }
);

ShopStatisticsSchema.index(
    {
        shopId: 1,
        createdOnYyyyMmDd: 1
    }
);

ShopStatisticsSchema.index(
    {
        createdAt: 1
    }
);

module.exports = mongoose.model('ShopStatistics', ShopStatisticsSchema);
