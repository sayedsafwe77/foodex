const User = require("../../Models/User");
require('../connection')();
const userSeeder = async() => {
    let user = new User();
    user.name = 'admin';
    user.email = 'admin@gmail.com';
    user.password = 'adminadmin';
    user.mobile = '011000000';
    user.type = 'admin';
    await user.save();
}

module.exports = userSeeder;