let express = require('express');
let router = express.Router();
const upload = require('../middleware/restaurant');
const RestaurantController = require('../controller/RestaurantController');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const Food = require('../Models/Food');
const cpUpload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'cover_photo', maxCount: 1 }])

router.post('/', cpUpload, auth, isAdmin, RestaurantController.create)

router.put('/:id', auth, isAdmin, async(req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body);
        await restaurant.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
});
router.get('/:id', async(req, res) => {
    res.send(await Restaurant.findById(req.params.id));
})
router.get('/:id/food', async(req, res) => {
    res.send(await Food.find({ 'resturant.id': req.params.id }));
})
router.get('/', RestaurantController.index)

router.delete('/:id', auth, isAdmin, RestaurantController.destroy);

module.exports = router;