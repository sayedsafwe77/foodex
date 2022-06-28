let express = require('express');
let Food = require('../Models/Food');
let Category = require('../Models/Category');
let Restaurant = require('../Models/Restaurant');
let router = express.Router();
router.get('/food', async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    res.send(await Food.find({ name: pattern }));
});
router.get('/rastaurant', async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    res.send(await Restaurant.find({ name: pattern }));
});
router.get('/food/category', async(req, res) => {
    let pattern = '.*' + req.body.category_name + '.*';
    pattern = new RegExp(pattern, 'g');
    let categorys = await Category.find({ name: pattern }).select('name');
    let category_ids = [];
    categorys.forEach(category => category_ids.push(category.id.toString()));
    res.send(await Food.find({ 'category.id': { $in: category_ids } }));
});

module.exports = router;