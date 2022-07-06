const express = require('express');
const FilterController = require('../controller/FilterController');
const router = express.Router();
router.get('/food', FilterController.getFoodWithName);
router.get('/rastaurant', FilterController.getRestaurentWithName);
router.get('/food/category', FilterController.getFoodWithCategory);
router.get('/food/rastaurant', FilterController.getFoodWithRestaurent);
module.exports = router;