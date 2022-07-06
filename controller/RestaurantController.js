let Restaurant = require('../Models/Restaurant');
const fs = require('fs');

const Joi = require('joi');
const Food = require('../Models/Food');
const schema = Joi.object({
    name: Joi.string()
        .required(),
    address: Joi.string()
        .required(),
    delivery_time: Joi.string()
        .required(),
    // rating: Joi.number()
    //     .required(),
    tags: Joi.array()
        .required(),
    verified: Joi.boolean()
        .required(),
    lat: Joi.string()
        .required(),
    long: Joi.string()
        .required()
})
const index = async(req, res) => {
    res.send(await Restaurant.find());
};



const create = async(req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
        let restaurant = new Restaurant(req.body);
        restaurant.pic = req.files.pic[0].filename;
        restaurant.cover_photo = req.files.cover_photo[0].filename;
        res.send(await restaurant.save());
    } catch (err) {
        if (err.details) {
            res.status(400).send({ 'msg': err.details[0].message });
        } else {
            res.status(400).send({ 'msg': 'pic is required' });
        }
    }
};
const show = async(req, res) => {
    res.send(await Restaurant.findById(req.params.id));
};
const update = async(req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body);
        await restaurant.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
};
const getRestaurentFood = async(req, res) => {
    res.send(await Food.find({ 'resturant.id': req.params.id }));
};
const destroy = async(req, res) => {
    let restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (restaurant) {
        fs.unlink(`assets/restaurant/${restaurant.pic}`, (err) => {});
        fs.unlink(`assets/restaurant/${restaurant.cover_photo}`, (err) => {});
    }
    res.send();
};
module.exports = {
    create,
    destroy,
    index,
    getRestaurentFood,
    show,
    update
}