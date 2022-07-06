const OrderSchema = require('../database/order');
const mongoose = require('mongoose');
let Order = mongoose.model('orders', OrderSchema);
module.exports = Order;