const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    phoneNumber: String,
    item: String,
});

const Grocery = mongoose.model('grocery', grocerySchema);

module.exports = Grocery;