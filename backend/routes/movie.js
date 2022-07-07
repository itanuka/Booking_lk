const express = require('express')
const router = express.Router();

const { 
    getMovies,
    getAdminMovies, 
    newMovie, 
    getSingleMovie, 
    updateMovie, 
    deleteMovie 

} = require('../controllers/movieController')


router.route('/movies').get(getMovies);
router.route('/admin/movies').get(getAdminMovies);
router.route('/movie/:id').get(getSingleMovie);



router.route('/admin/movie/new').post(newMovie);

router.route('/admin/movie/:id')
    .put(updateMovie)
    .delete(deleteMovie);

module.exports = router;