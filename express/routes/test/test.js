// Imports
const express = require('express');

// Define Router
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('test 123123');
    try {

        return res.json({
            test: 'test 1234'
        });
    } catch (error) {
        return res.json({
            test: 'test error',
            error
        });
    }

});

module.exports = router;