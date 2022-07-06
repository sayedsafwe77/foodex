const AddToCardSchema = require('../database/addtocard');
const mongoose = require('mongoose');
let AddToCard = mongoose.model('add_to_card', AddToCardSchema);
module.exports = AddToCard;