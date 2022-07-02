let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
const upload = require('../middleware/uploadavatar');
const UserController = require('../controller/UserController');
router.post('/', upload.single('avatar'), UserController.store, (err, req, res, next) => {
    res.status(400).send({ 'msg': err });
})
router.put('/profile/pic', auth, upload.single('avatar'), UserController.updateProfilePic, (err, req, res, next) => {
    res.status(400).send({ 'msg': err.message });
});
router.get('/:id', UserController.show)
router.put('/:id', auth, UserController.update);
router.delete('/me', auth, UserController.destroy);
module.exports = router;