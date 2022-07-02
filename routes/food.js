let express = require('express');
let Food = require('../Models/Food');
let Category = require('../Models/Category');
let Restaurant = require('../Models/Restaurant');
let router = express.Router();
const Joi = require('joi');
const upload = require('../middleware/food');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    resturant_id: Joi.required(),
    cat_id: Joi.required(),
    price: Joi.required(),
    description: Joi.required()
})
router.post('/', auth, isAdmin, upload.single('pic'), async(req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
        let category = await Category.findById(req.body.cat_id).select('name');
        let resturant = await Restaurant.findById(req.body.resturant_id).select('name');
        let food = new Food(req.body);
        food.pic = req.file.filename;
        food.category = {
            id: req.body.cat_id,
            name: category.name
        };
        food.resturant = {
            id: req.body.resturant_id,
            name: resturant.name
        };
        res.send(await food.save());
    } catch (err) {
        if (err.details) {
            res.status(400).send({ 'msg': err.details[0].message });
        } else {
            res.status(400).send({ 'msg': 'pic is required' });
        }
    }
})

router.put('/:id', auth, isAdmin, async(req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        food.name = req.body.name;
        await food.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
});


router.get('/:id', async(req, res) => {
    res.send(await Food.findById(req.params.id));
})

router.get('/', async(req, res) => {
    let food = await Food.findOne({ _id: '628e21cec76aabfb6dc6b529' })
        .populate('resturant.id')
        .populate('category.id')
        .exec();
    res.send(food);
})



router.delete('/:id', auth, isAdmin, async(req, res) => {
    let food = await Food.findByIdAndDelete(req.params.id);
    if (food) {
        fs.unlink(`assets/food/${food.pic}`, (err) => {});
    }
    res.send();
});

module.exports = router;