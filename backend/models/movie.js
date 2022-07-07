const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter movie name'],
        trim: true,
        maxLength: [200, 'Prodict name cannot exceed 100 characters']
    },

    cast: {
        type: String,
        required: [true, 'Please enter movie cast'],
        trim: true,
        maxLength: [200, 'Prodict name cannot exceed 100 characters']
    },

    description: {
        type: String,
        required: [true, 'Please enter movie description'],
    },

    ticketPrice: {
        type: Number,
        default: 0.0
    },

    theater: {
        type: String,
        required: [true, 'Please select theater for this movie'],
        enum: {
            values: [
                'Savoy Wellawatte',
                'Nikado Kadawatha',
                'Regal Gampaha',
                'Sigiri Veyangoda'
            ],
            message: 'Please select correct theater for the movie'
        }
    },

    noOfAvailableSeats: {
        type: Number,
        default: 0.0
    },


    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Movie', movieSchema)