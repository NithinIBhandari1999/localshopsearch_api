// Imports
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const listEndpoints = require('express-list-endpoints');

const routes = require('../express/routes/index');

require('dotenv').config();
const app = express();
const router = express.Router();
const connectDB = require('../express/config/db');

require('../express/routes/test/testReg');

app.use(function (req, res, next) {
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type, Accept,Authorization,Origin'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.all('/.netlify/functions/api/*', function (req, res, next) {
    const origin = req.header('origin');
    res.header('Access-Control-Allow-Origin', origin);
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

router.use('/', routes);

app.use('/.netlify/functions/api', router);

listEndpoints(app).forEach((item) => {
    // console.log(item)

    // console.log(item);

    if(item.path.includes('-----')){
      console.log(item);
    }
});

module.exports.handler = serverless(app);
