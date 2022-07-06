let express = require('express');
let router = express.Router();
const upload = require('../middleware/categoryavatar');
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const CategoryController = require('../controller/CategoryController');
router.post('/', auth, isAdmin, upload.single('pic'), CategoryController.create)
router.put('/:id', auth, isAdmin, CategoryController.update);
router.get('/:id', CategoryController.show);
router.get('/', CategoryController.index)
router.delete('/:id', auth, isAdmin, CategoryController.destroy);
module.exports = router;