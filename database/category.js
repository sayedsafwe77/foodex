let mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String
    },
})

module.exports = CategorySchema;