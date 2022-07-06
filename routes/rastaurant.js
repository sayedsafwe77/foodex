let express = require('express');
let router = express.Router();
const upload = require('../middleware/restaurant');
const RestaurantController = require('../controller/RestaurantController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const cpUpload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'cover_photo', maxCount: 1 }])
router.post('/', cpUpload, auth, isAdmin, RestaurantController.create)
router.put('/:id', auth, isAdmin, RestaurantController.update);
router.get('/:id', RestaurantController.show);
router.get('/:id/food', RestaurantController.getRestaurentFood);
router.get('/', RestaurantController.index)

router.delete('/:id', auth, isAdmin, RestaurantController.destroy);

module.exports = router;