 const AddToCard = require("../Models/AddToCard");
 const show = async(req, res) => {
     res.send(await AddToCard.findById(req.user._id.toString()));
 }
 const addItemToCard = async(req, res) => {
     try {
         req.body.items = addSimilerProducts(req.body.items);
         let card = await AddToCard.findOne({ user_id: req.user._id.toString() });
         if (!card) {
             card = await AddToCard.create({ food: req.body.items, user_id: req.user._id.toString() })
         } else {
             let oldItemIds = card.food.map(function(food) { return food.id.toString(); });
             let newItemIds = req.body.items.map(function(food) { return food.id; });
             let newItem = req.body.items.filter(item => {
                 if (oldItemIds.indexOf(item.id) == -1) {
                     return true
                 }
             });
             card.food.forEach(item => {
                 let updateItem = newItemIds.indexOf(item.id.toString());
                 if (updateItem != -1) {
                     item.quantity += req.body.items[updateItem].quantity;
                 }
             });
             newItem.map(item => card.food.push(item));
             await card.save();
         }
         res.send(card);
     } catch (error) {
         res.send(error, 400);
     }
 }

 function addSimilerProducts(items) {
     let exist;
     let itemsIds = items.map(food => food.id);
     let is_iterate = true;
     let duplicated_index = [];
     items.filter((item, index) => {
         while (is_iterate) {
             exist = itemsIds.indexOf(item.id, index + 1);
             if (exist != -1) {
                 index = exist;
                 duplicated_index.push(index);
                 item.quantity += items[exist].quantity;
             } else {
                 is_iterate = false;
             }
         }
         return item;
     })
     duplicated_index.forEach((item, index) => {
         items.splice(item - index, 1);
     });
     return items;
 }

 module.exports = {
     show,
     addItemToCard
 }