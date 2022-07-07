const Theater = require('../models/theater')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

// Create new theater =>  /api/v1/admin/theater/new
exports.newTheater = catchAsyncErrors(async (req, res, next) => {

    const theater = await Theater.create(req.body);

    res.status(201).json({
        success: true,
        theater
    })
})

// Get all theaters =>    /api/v1/theaters
exports.getTheaters = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const theatersCount = await Theater.countDocuments();

    const apiFeatures = new APIFeatures(Theater.find(), req.query)
        .searchTheater()
        .filter()
        .pagination(resPerPage)

    const theaters = await apiFeatures.query;

        res.status(200).json({
            success: true,
            theatersCount,
            theaters
        })
   
})


// Get all theaters (Admin) => /api/v1/admin/theaters
exports.getAdminTheaters = catchAsyncErrors ( async (req, res, next) => {

    const theaters = await Theater.find();

    res.status(200).json({
        success: true,
        theaters
    })

})

// Get single theater datails =>  /api/v1/theater/:id
exports.getSingleTheater = catchAsyncErrors(async (req, res, next) => {

    const theater = await Theater.findById(req.params.id);

    if(!theater) {
        return next(new ErrorHandler('Theater not found', 404));
    }

    res.status(200).json({
        success: true,
        theater
    })
})


// Update Theater =>  /api/v1/admin/theater/:id
exports.updateTheater = catchAsyncErrors(async (req, res, next) => {
    let theater = await Theater.findById(req.params.id);

    if(!theater) {
        return next(new ErrorHandler('Theater not found', 404));
    }

    theater = await Theater.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        theater
    })

})


// Delete Theater   =>  /api/v1/admin/theater/:id
exports.deleteTheater = catchAsyncErrors(async (req, res, next) => {

    const theater = await Theater.findById(req.params.id);

    if(!theater) {
        return next(new ErrorHandler('Theater not found', 404));
    }

    await theater.remove();

    res.status(200).json({
        success: true,
        message: 'Theater is deleted.'
    })
})