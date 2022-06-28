let express = require('express');
let router = express.Router();
const upload = require('../middleware/restaurant');
const RestaurantController = require('../controller/RestaurantController');
const cpUpload = upload.fields([{ name: 'pic', maxCount: 1 }, { name: 'cover_photo', maxCount: 1 }])

router.post('/', cpUpload, RestaurantController.create)

router.put('/:id', async(req, res) => {
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

router.get('/', RestaurantController.index)

router.delete('/:id', RestaurantController.destroy);

module.exports = router;