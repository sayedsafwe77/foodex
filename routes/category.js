let express = require('express');
let Category = require('../Models/Category');
let router = express.Router();
const Joi = require('joi');
const upload = require('../middleware/categoryavatar');
const fs = require('fs');
const path = require('path');
const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})
router.post('/', upload.single('pic'), async(req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
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
})

router.put('/:id', async(req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
        const category = await Category.findById(req.params.id);
        category.name = req.body.name;
        await category.save();
        res.send()
    } catch (error) {
        res.status(400).send({ 'msg': error.details[0].message });
    }
});


router.get('/:id', async(req, res) => {
    res.send(await Category.findById(req.params.id));
})

router.get('/', async(req, res) => {
    res.send(await Category.find());
})

router.delete('/:id', async(req, res) => {
    let category = await Category.findByIdAndDelete(req.params.id);
    if (category) {
        fs.unlink(`assets/category/${category.pic}`, (err) => {});
    }
    res.send();
});
module.exports = router;