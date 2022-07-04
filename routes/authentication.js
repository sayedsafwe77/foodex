const User = require('../Models/User');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
router.post('/login', async function(req, res) {
    try {
        let user = await User.findByCradentials(req.body.email, req.body.password);
        let token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.send('invalid cradentails', 400);
    }
})

router.post('/logout', auth, async function(req, res) {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send()
    } catch (error) {
        res.send(500);
    }
})
router.get('/profile', auth, async(req, res) => {
    res.send(req.user);
});
module.exports = router