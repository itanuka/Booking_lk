const Order = require('../models/order');
const Movie = require('../models/movie');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures')

//users--------------------------------------------------------

//create a new order logged user => /api/v1/order/new
exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const{
        orderItems,
        paymentInfo,
        phone_no,
        deliveryInfo, 
        deliveryPrice,
        totPrice,
        orderStatus,

    } = req.body;

    const order = await Order.create({

        userID: req.user._id,
        customerName: req.user.first_name + " " + req.user.last_name,
        phone_no,
        orderItems,
        paymentInfo,
        deliveryInfo, 
        deliveryPrice,
        totPrice,
        createdAt: Date.now(),
        orderStatus,

    })


    res.status(200).json({
        success: true,
        order
    })
})


//get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

//user update order
exports.updateOrderUser = catchAsyncErrors( async(req,res,next) => {
    let order = await Order.findById(req.params.id)

    if(!order){
        return res.status(400).json({
            success: false,
            message: 'Order not found'
        })
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        order
    })

})

//get logged in user order => /api/v1/orders/me
exports.myOrders = catchAsyncErrors( async(req,res,next) => {
    // const orders = await Order.find({userID:req.user._id})

    const apiFeatures = new APIFeatures(Order.find({userID:req.user._id}).sort('-createdAt'), req.query)

    const orders = await apiFeatures.query;

    res.status(200).json({
        success: true,
        orders
    })
})


//user delete order => /api/v1/order/:id
exports.deleteOrderUser = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
    })
})



//Admin---------------------------------------------------------------------------------


//get all orders => /api/v1/admin/orders
//get all orders => /api/v1/admin/orders?keyword=chocalate
exports.allOrders = catchAsyncErrors( async(req,res,next) => {

    const apiFeatures = new APIFeatures(Order.find().sort('-createdAt'), req.query)
        .admin_order_search()
        .filter()

    const orders = await apiFeatures.query;

    let totalAmount = 0;

    orders.forEach(order =>{
        totalAmount += order.totPrice
    })

    res.status(200).json({
        success: true,
        count: orders.length,
        totalAmount,
        orders
    })
})


//admin get single order details => /api/v1/admin/:id
exports.getSingleOrderAdmin = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


//update /process orders - ADMIN => /api/v1/admin/:id
exports.updateOrderAdmin = catchAsyncErrors( async(req,res,next) => {

    let order = await Order.findById(req.params.id)

    if(!order){
        return res.status(400).json({
            success: false,
            message: 'Order not found'
        })
    }

    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        order
    })
})


/*
//admin delete order => /api/v1/admin/order/:id
exports.deleteOrderAdmin = catchAsyncErrors( async(req,res,next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true,
    })
})
*/