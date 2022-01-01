const FormatResponse = require('response-format');


const Shop = require('../../models/shop/Shop');

const genLat = () => {
  return ((Math.random() * 180) - 90);
};

const genLng = () => {
  return ((Math.random() * 360) - 180);
};

const generateRandomLatLng = () => {
  return {
    type: 'Point',
    coordinates: [genLng(), genLat()]
  };
};

const getShopDummyData = () => {
  const insertData = {
    name: 'Test',
    email: 'Test@mailinator.com',
    password: 'Nithin@12345',
    description: 'abcd',
    addressFull: 'Address',
    pincode: '123456',
    statusEmailVerified: 'true',
    statusIsBoardingCompleted: 'true',
    statusReverify: 'true',
    statusIsApproved: 'true',
    statusIsSubscriptionPlan: 'true',
    notApprovedReason: '',
  };

  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
  insertData.email = `shopTest_${randomNumber}@mailinator.com`;

  insertData.password = 'Nithin@12345';

  insertData.name = `Shop Test ${randomNumber}`;

  insertData.geolocation = generateRandomLatLng();

  return insertData;
};

exports.generateDummyShop = async (req, res) => {
  try {

    const inserts = [];

    for (let index = 0; index < 2500; index++) {
      inserts.push(getShopDummyData());
    }

    await Shop.insertMany(inserts);

    const customResponse = FormatResponse.success('Success', {

    });
    return res.status(customResponse.statusCode).json(customResponse);

  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json(FormatResponse.badRequest('A shop with this email already exists', {}));
    }

    return res.status(400).json(FormatResponse.badRequest('Something went wrong', {}));
  }
};

exports.generateDummyShop2 = async (req, res) => {
  try {

    const insertData = getShopDummyData();

    const shop = await Shop.create(insertData);

    shop.save(async () => {
      const customResponse = FormatResponse.success('Success', {
        insertData
      });
      return res.status(customResponse.statusCode).json(customResponse);
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json(FormatResponse.badRequest('A shop with this email already exists', {}));
    }

    return res.status(400).json(FormatResponse.badRequest('Something went wrong', {}));
  }
};