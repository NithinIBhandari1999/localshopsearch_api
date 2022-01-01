const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema.Types;

const ProductListSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
        },
        shopId: {
            type: ObjectId,
        },

        productName: {
            type: String,
            required: true,
            maxLength: 150,
            trim: true
        },
        productDescription: {
            type: String,
            default: ''
        },
        productQuantity: {
            type: Number,
            default: ''
        },
        productUnits: {
            type: String,
            default: ''
        },
        priceMrp: {
            type: Number,
            default: ''
        },
        priceSelling: {
            type: String,
            default: ''
        },

        uniqueUrl: {
            type: String,
            default: '',
            trim: true,
            lowercase: true
        },

        
        imageList: [
            {
                imageLink: {
                    type: String,
                    default: '',
                    trim: true,
                },
            },
        ],

        keywordIndex: {
            type: String,
            default: '',
            trim: true,
            lowercase: true,
        },

        // Note: Additional shop info to avoid expensive lookup
        shopInfo: {
            shopName: {
                type: String,
                maxLength: 150,
                trim: true,
            },
            shopDescription: {
                type: String,
                default: '',
            },

            geolocation: {
                type: {
                    type: String,
                    default: 'Point',
                },
                coordinates: [Number],
            },

            // Address
            addressFull: {
                type: String,
                default: '',
                trim: true,
            },
            countryName: {
                type: String,
                default: '',
                trim: true,
            },
            stateName: {
                type: String,
                default: '',
                trim: true,
            },
            cityName: {
                type: String,
                default: '',
                trim: true,
            },
            localityName: {
                type: String,
                default: '',
                trim: true,
            },
            googleMapEmbedLink: {
                type: String,
                default: '',
                trim: true,
            },

            phoneNumber: {
                type: String,
                default: '0',
                trim: true,
            },
            whatsappNumber: {
                type: String,
                default: 0,
                trim: true,
            },

            uniqueUrl: {
                type: String,
                default: '',
                trim: true,
                lowercase: true,
            },
        },
    },
    {
        collection: 'ProductList',
        timestamps: true
    }
);

ProductListSchema.index({
    userId: 1,
});

ProductListSchema.index({
    shopId: 1,
});

ProductListSchema.index(
    {
        geolocation: '2dsphere'
    },
    {
        sparse: true
    }
);

module.exports = mongoose.model('ProductList', ProductListSchema);
