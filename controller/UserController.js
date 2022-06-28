let User = require('../Models/User');
let bcrypt = require('bcryptjs');
let UserSchema = require('../Request/UserRequest');
let store = async(req, res) => {
    try {
        const value = await UserSchema.validateAsync(req.body);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            console.log(user);
            throw new Error(JSON.stringify({ details: 'email already exist' }));
        }
        user = new User(req.body);
        user.avatar = req.file.filename;
        user.password = await bcrypt.hash(req.body.password, 8);
        res.send(await user.save());
    } catch (err) {
        res.status(400).send({ 'msg': (err.details[0].message || err) });;
    }
};
let updateProfilePic = async(req, res) => {
    req.user.avatar = req.file.filename;
    await req.user.save();
    res.send()
};
let show = async(req, res) => {
    res.send(await User.findById(req.params.id));
};

let update = async(req, res) => {
    res.send(await User.findByIdAndUpdate(req.params.id, req.body));
};

let destroy = async(req, res) => {
    await req.user.remove();
    res.send(req.user);
};
module.exports = {
    store,
    updateProfilePic,
    show,
    update,
    destroy
}