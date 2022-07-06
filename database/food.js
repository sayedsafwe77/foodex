let mongoose = require('mongoose');
let FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    resturant: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'restaurants',
            required: true
        },
        name: {
            type: String
        }
    },
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'categories',
            required: true
        },
        name: {
            type: String
        }
    },
    pic: {
        type: String,
        required: true,
        get(value) {
            return `${process.env.APP_URL}:${process.env.PORT}/food/${value}`;
        }
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    number_of_ratings: {
        type: Number
    },
}, { toJSON: { getters: true } })

module.exports = FoodSchema;