const getFoodWithName = async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    res.send(await Food.find({ name: pattern }));
};

const getRestaurentWithName = async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    res.send(await Restaurant.find({ name: pattern }));
};

const getFoodWithCategory = async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    let categorys = await Category.find({ name: pattern }).select('name');
    let category_ids = [];
    categorys.forEach(category => category_ids.push(category.id.toString()));
    res.send(await Food.find({ 'category.id': { $in: category_ids } }));
};
const getFoodWithRestaurent = async(req, res) => {
    let pattern = '.*' + req.body.name + '.*';
    pattern = new RegExp(pattern, 'g');
    res.send(await Food.find({ 'resturant.name': pattern }));
};
module.exports = {
    getFoodWithName,
    getRestaurentWithName,
    getFoodWithCategory,
    getFoodWithRestaurent
}