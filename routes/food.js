let express = require('express');
const FoodController = require('../controller/FoodController');
let router = express.Router();
const upload = require('../middleware/food');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
router.post('/', auth, isAdmin, upload.single('pic'), FoodController.create)
router.put('/:id', auth, isAdmin, FoodController.update);
router.get('/:id', FoodController.show)
router.get('/', FoodController.index)
router.delete('/:id', auth, isAdmin, FoodController.destroy);
module.exports = router;