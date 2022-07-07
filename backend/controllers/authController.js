const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto')
const cloudinary = require('cloudinary');




//USER REGISTER METHOD
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    })

    const { first_name, last_name, gender, address, phone_no, email, password } = req.body;

    const user = await User.create({
        first_name,
        last_name,
        gender,
        address,
        phone_no,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }

    })

    sendToken(user, 200, res)

})


//USER LOGIN METHOD
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));

    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or password', 401));
    }

    sendToken(user, 200, res)

})


//PASSWORD FORGET METHOD
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));

    }
    // GET RESET TOKEN
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'Booking.lk Password Recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} `
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }

})




//PASSWORD RESET METHOD
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400))
    }


    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password dose not match', 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)

})


//METHOD OF LOGGED USER PROFILE
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

})


//UPDATE USER PASSWORD METHOD
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Checking  user's old password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})



//UPDATE USER PROFILE METHOD
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        address: req.body.address,
        phone_no: req.body.phone_no,
        email: req.body.email

    }

    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})



//USER LOGOUT METHOD
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })

})




//GET ALL USERS BY ADMIN
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})



//GET SINGLE USER BY ADMIN
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {

        return next(new ErrorHandler(`User dose not found with id: ${req.params.id}`))
    }
    res.status(200).json({
        success: true,
        user
    })

})



//CHANGE USER ROLE BY ADMIN
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        address: req.body.address,
        phone_no: req.body.phone_no,
        email: req.body.email,
        role: req.body.role

    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})



//DELETE A USER BY ADMIN
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User dose not found with id: ${req.params.id}`))
    }

    await user.remove();


    res.status(200).json({
        success: true,
        user
    })

})