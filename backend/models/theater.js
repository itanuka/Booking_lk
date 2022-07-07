const mongoose = require('mongoose');
const validator = require('validator');

const theaterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter theater name']
    },

    address: {
        type: String,
        required: [true, 'Please enter theater address']
    },

    city: {
        type: String,
        required: [true, 'Please enter theater city']
    },
    phoneNo:{
        type: String,
        unique:true,
        required: [true, 'Please enter your phoneNo'],
        maxLength: [10, ' Invalid Phone Number'],
        minlength:[10, 'Invalid Phone Number'],
    },
    email:{
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']   
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Theater', theaterSchema)