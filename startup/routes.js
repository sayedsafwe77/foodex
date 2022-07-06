let user = require('../routes/user');
let category = require('../routes/category');
let rastaurant = require('../routes/rastaurant');
let food = require('../routes/food');
let filter = require('../routes/filter');
let authentication = require('../routes/authentication');
let card = require('../routes/addtocard');
let order = require('../routes/order');
module.exports = {
    user,
    category,
    rastaurant,
    food,
    filter,
    authentication,
    card,
    order
}