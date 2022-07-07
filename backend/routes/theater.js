const express = require('express')
const router = express.Router();

const { 
    getTheaters,
    getAdminTheaters, 
    newTheater, 
    getSingleTheater, 
    updateTheater, 
    deleteTheater 

} = require('../controllers/theaterController')

router.route('/theaters').get(getTheaters);
router.route('/admin/theaters').get(getAdminTheaters);
router.route('/theater/:id').get(getSingleTheater);

router.route('/admin/theater/new').post(newTheater);

router.route('/admin/theater/:id')
    .put(updateTheater)
    .delete(deleteTheater);

module.exports = router;