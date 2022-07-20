let User = require('../Models/User');
let UserSchema = require('../Request/UserRequest');
let store = async(req, res) => {
    try {
        const value = await UserSchema.validateAsync(req.body);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log('here');
            throw 'email already exist';
        }
        user = new User(req.body);
        user.avatar = req.file.filename;
        res.send(await user.save());
    } catch (err) {
        res.status(400).send({ 'msg': err });
    }
};
let updateProfilePic = async(req, res) => {
    try {
        req.user.avatar = req.file.filename;
        await req.user.save();
        res.send({ msg: 'done' })
    } catch (error) {
        res.send({ msg: 'done' }, 200);
    }
};
let show = async(req, res) => {
    res.send(await User.findById(req.params.id));
};

let update = async(req, res) => {
    try {
        let user = await User.findById(req.params.id);
        user.update(req.body);
        res.send(await user.save());
    } catch (error) {
        res.send(error, 400);
    }
};

let destroy = async(req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.send(error, 400);
    }
};
module.exports = {
    store,
    updateProfilePic,
    show,
    update,
    destroy
}