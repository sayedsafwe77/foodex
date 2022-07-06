let mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    food: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'foods'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: String,
            required: true
        }
    }],
    total: {
        type: String,
        required: true
    }
})
module.exports = OrderSchema;