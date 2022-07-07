const express = require('express');
const router = express.Router();

const { 
    userCount,
    theaterCount,
    orderCount,
    movieCount,
    count
} = require('../controllers/adminDashController');


router.route('/userCount').get(userCount);
router.route('/theaterCount').get(theaterCount);
router.route('/orderCount').get(orderCount);
router.route('/movieCount').get(movieCount);
router.route('/count').get(count);

module.exports = router;