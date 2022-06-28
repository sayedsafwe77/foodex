const RestaurantsSchema = require('../database/restaurant');
const mongoose = require('mongoose');
let Restaurant = mongoose.model('restaurants', RestaurantsSchema);
module.exports = Restaurant;