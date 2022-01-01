const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { ObjectId } = Schema.Types;

const ShopSchema = new mongoose.Schema(
	{
		userId: {
			type: ObjectId,
		},

		shopName: {
			type: String,
			required: true,
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
			unique: true
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

	},
	{
		collection: 'Shop',
		timestamps: true,
	}
);

ShopSchema.index(
	{
		geolocation: '2dsphere',
	},
	{
		sparse: true,
	}
);

module.exports = mongoose.model('Shop', ShopSchema);
