const CategorySchema = require('../database/category');
const mongoose = require('mongoose');
let Category = mongoose.model('categories', CategorySchema);
module.exports = Category;