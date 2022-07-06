let express = require('express');
let router = express.Router();
const auth = require('../middleware/auth');
const OrderController = require('../controller/OrderController');
router.get('/', auth, OrderController.index);
router.post('/', auth, OrderController.create);
module.exports = router;