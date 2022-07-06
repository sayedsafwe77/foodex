let mongoose = require('mongoose');

let AddToCardSchema = new mongoose.Schema({
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
        }
    }]
})
module.exports = AddToCardSchema;