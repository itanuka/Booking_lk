const User = require('../models/user');
const Theater = require('../models/theater');
const Order = require('../models/order');
const Movie = require('../models/movie');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const API_FEATURES = require('../utils/apiFeatures');

exports.userCount = catchAsyncErrors( async(req, res, next) => {

    const usersCount = await User.countDocuments()

    res.status(200).json({
        success: true,
        usersCount
    })
})

exports.theaterCount = catchAsyncErrors(async (req, res, next) => {

    const theatersCount = await Theater.countDocuments();

        res.status(200).json({
            success: true,
            theatersCount,
        })
   
})

exports.orderCount = catchAsyncErrors( async(req,res,next) => {

    const apiFeatures = new API_FEATURES(Order.find().sort('-createdAt'), req.query)
        .admin_order_search()
        .filter()

    const orders = await apiFeatures.query;
    const odersCount = await Order.countDocuments();
    let totalAmount = 0;

    orders.forEach(order =>{
        totalAmount += order.totPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        odersCount

    })
})

exports.movieCount = catchAsyncErrors ( async (req, res, next) => {

    const moviesCount = await Movie.countDocuments()


    res.status(200).json({
        success: true,
        moviesCount
    })

})



exports.count = catchAsyncErrors ( async (req, res, next) => {


    const usersCount = await User.countDocuments()
    const theatersCount = await Theater.countDocuments();
    const moviesCount = await Movie.countDocuments()
    const apiFeatures = new API_FEATURES(Order.find().sort('-createdAt'), req.query)

        const orders = await apiFeatures.query;
        const odersCount = await Order.countDocuments();
        let totalAmount = 0;

        orders.forEach(order =>{
            totalAmount += order.totPrice
        })
        

    res.status(200).json({
        success: true,
        moviesCount,
        usersCount,
        theatersCount,
        odersCount,
        totalAmount,
        
    })

})