let mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        get(value) {
            return `${process.env.APP_URL}:${process.env.PORT}/category/${value}`;
        }
    },
}, { toJSON: { getters: true } })
module.exports = CategorySchema;