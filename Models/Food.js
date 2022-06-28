const FoodSchema = require('../database/food');
const mongoose = require('mongoose');
let Food = mongoose.model('foods', FoodSchema);
module.exports = Food;