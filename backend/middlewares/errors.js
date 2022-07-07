const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV == 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV == 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message


        //DUPLICATE-KEY ERROR IN MONGO
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400)
        }

        //INCORRECT JWT TOKEN 
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON web Token is invalid. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }

        //EXPIRED JWT ERROR
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON web Token is expired. Try Again!!!'
            error = new ErrorHandler(message, 400)
        }


        //START CODE BY ANUKA

        if (err.name === 'CastError') {
            const message = `Resourse not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // MONGO VALIDATION ERROR
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400)
        }

        //END CODE BY ANUKA


        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })

    }

}