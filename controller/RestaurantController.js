let Restaurant = require('../Models/Restaurant');
const fs = require('fs');

const Joi = require('joi');
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
    index
}