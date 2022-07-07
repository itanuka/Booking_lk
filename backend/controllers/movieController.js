const Movie = require('../models/movie')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')


exports.newMovie = catchAsyncErrors ( async (req, res, next) => {

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'movies'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    const movie = await Movie.create(req.body);

    res.status(201).json({
        success: true,
        movie
    })
})


exports.getMovies = catchAsyncErrors ( async (req, res, next) => {

    const resPerPage = 4;
    const moviesCount = await Movie.countDocuments()

    const apiFeatures = new APIFeatures(Movie.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const movies = await apiFeatures.query;


    res.status(200).json({
        success: true,
        moviesCount,
        resPerPage,
        movies
    })

})



exports.getAdminMovies = catchAsyncErrors ( async (req, res, next) => {

    const movies = await Movie.find();



    res.status(200).json({
        success: true,
        movies
    })

})



exports.getSingleMovie = catchAsyncErrors ( async (req, res, next) => {

    const movie = await Movie.findById(req.params.id);

    if(!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }

    res.status(200).json({
        success: true,
        movie
    })
})


exports.updateMovie = catchAsyncErrors ( async (req, res, next) => {

    let movie = await Movie.findById(req.params.id);

    if(!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }

    let images = []
    if(typeof req.body.images === 'string'){
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if(images !== undefined) {

        
        for(let i = 0; i < movie.images.length; i++ ){
        const result = await cloudinary.v2.uploader.destroy(movie.images[i].public_id)
    }

    let imagesLinks = [];

    for(let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'movies'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    }

    

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        movie
    })
})


exports.deleteMovie = catchAsyncErrors ( async (req, res, next) => {

    const movie = await Movie.findById(req.params.id);

    if(!movie) {
        return next(new ErrorHandler('Movie not found', 404));
    }

    
    for(let i = 0; i < movie.images.length; i++ ){
        const result = await cloudinary.v2.uploader.destroy(movie.images[i].public_id)
    }

    await movie.remove();

    res.status(200).json({
        success: true,
        message: 'Movie is deleted.'
    })
})