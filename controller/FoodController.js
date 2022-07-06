const Joi = require('joi');
const fs = require('fs');
const path = require('path');
let Food = require('../Models/Food');
let Category = require('../Models/Category');
let Restaurant = require('../Models/Restaurant');
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
const create = async(req, res) => {
    try {
        await schema.validateAsync(req.body);
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
};
const update = async(req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        food.name = req.body.name;
        await food.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
};
const show = async(req, res) => {
    res.send(await Food.findById(req.params.id));
};
const index = async(req, res) => {
    let food = await Food.find()
        .populate('resturant.id')
        .populate('category.id')
        .exec();
    res.send(food);
};
const destroy = async(req, res) => {
    let food = await Food.findByIdAndDelete(req.params.id);
    if (food) {
        fs.unlink(`assets/food/${food.pic}`, (err) => {});
    }
    res.send();
};
module.exports = {
    create,
    update,
    show,
    index,
    destroy
}