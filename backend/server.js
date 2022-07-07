const app = require('./app')
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary')



// HANDLE UNCATCH EXCEPTION
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1);
})


// SETUP CONFIG
dotenv.config({ path: 'backend/config/config.env' })


// CONNECTING DATABASE TO THE SERVER
connectDatabase();



// CLOUDANARY CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})



// HANDLE UNHANDLE PROMISE
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})




// START PAYMENT PART
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

app.use(cors());

const PaymentRouter = require("./routes/Bill");


app.use("/Payment", PaymentRouter);


// END PAYMENT PART