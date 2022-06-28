let mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 10,
    },
    mobile: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

module.exports = UserSchema;