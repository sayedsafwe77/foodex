let mongoose = require('mongoose');
const db_connect = () => {
    mongoose.connect(`mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
        .then(console.log('database connected'))
        .catch(err => console.log('error while connecting', err));
}
module.exports = db_connect;