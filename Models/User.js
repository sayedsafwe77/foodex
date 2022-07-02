const UserSchema = require('../database/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
UserSchema.pre('save', async function() {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
})
UserSchema.methods.generateAuthToken = async function() {
    let user = this;
    let token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY);
    user.tokens.push({ token });
    await user.save();
    return token;
}
UserSchema.statics.findByCradentials = async function(email, password) {
    let user = await User.findOne({ email });
    if (!user) {
        throw new Error('invalid email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('invalid password');
    }
    return user;
}
let User = mongoose.model('users', UserSchema);
module.exports = User;