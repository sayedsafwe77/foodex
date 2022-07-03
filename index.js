let express = require('express');
let app = express();
let routes = require('./startup/routes');
let db_connect = require('./database/connection');
db_connect();
app.get('/', (req, res) => {
    res.send('test');
})
app.use(express.json());
app.use(express.static('assets'))
app.use('/auth', routes.authentication);
app.use('/user', routes.user);
app.use('/food', routes.food);
app.use('/filter', routes.filter);
app.use('/category', routes.category);
app.use('/rastaurant', routes.rastaurant);
let port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log(`server is running ${port}`);
})