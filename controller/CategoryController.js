const Joi = require('joi');
const Category = require('../Models/Category');
const fs = require('fs');
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})


const create = async(req, res) => {
    try {
        await schema.validateAsync(req.body);
        let category = new Category(req.body);
        category.pic = req.file.filename;
        res.send(await category.save());
    } catch (err) {
        if (err.details) {
            res.status(400).send({ 'msg': err.details[0].message });
        } else {
            res.status(400).send({ 'msg': 'pic is required' });
        }
    }
}

const update = async(req, res) => {
    try {
        await schema.validateAsync(req.body);
        const category = await Category.findById(req.params.id);
        category.name = req.body.name;
        await category.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
};
const show = async(req, res) => {
    res.send(await Category.findById(req.params.id));
};
const index = async(req, res) => {
    res.send(await Category.find());
};
const destroy = async(req, res) => {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
        fs.unlink(`assets/category/${category.pic}`, (err) => {});
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