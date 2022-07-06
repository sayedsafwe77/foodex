let express = require('express');
let router = express.Router();
const auth = require('../middleware/auth');
const AddToCardController = require('../controller/AddToCardController');
router.get('/', auth, AddToCardController.show);
router.post('/', auth, AddToCardController.addItemToCard);
module.exports = router;