const AddToCard = require("../Models/AddToCard");
const Food = require("../Models/Food");
const Order = require("../Models/Order");
const index = async(req, res) => {
    res.send(await Order.find({ user_id: req.user._id.toString() }));
}
const create = async(req, res) => {
    try {
        const card = await getUserCard(req.user);
        if (!card) {
            throw new Error('there is no card to create order');
        }
        let total = calculateTotal(card.food);
        let order = new Order;
        order.user_id = req.user._id.toString();
        order.food = [];
        let product = {};
        card.food.forEach(item => {
            product.id = item._id;
            product.price = item.id.price;
            product.quantity = item.quantity;
            order.food.push(product);
        });
        order.total = total;
        await order.save();
        removeUserCard(req.user);
        res.send(order);
    } catch (error) {
        res.send({ error }, 400)
    }
}

const getUserCard = async(user) => {
    return await AddToCard.findOne({ 'user_id': user._id.toString() }).populate('food.id');
}
const removeUserCard = async(user) => {
    return await AddToCard.deleteOne({ user_id: user._id.toString() })
}
const calculateTotal = (arr) => {
    let total = 0;
    arr.forEach(item => {
        total += (item.id.price * item.quantity);
    })
    return total;
}
module.exports = {
    create,
    index
}