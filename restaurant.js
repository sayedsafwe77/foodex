let mongoose = require('mongoose');

let RestaurantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    delivery_time: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true
    },
    cover_photo: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    tags: {
        type: [String],
    },
    verified: {
        type: Boolean
    },
    number_of_ratings: {
        type: Number
    },
    lat: {
        type: String
    },
    long: {
        type: String
    }
})

module.exports = RestaurantsSchema;