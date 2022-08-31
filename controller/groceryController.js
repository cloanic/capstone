const Grocery = require('../model/Grocery');

// add grocery item to the database
exports.addGroceries = async (req, res) => {
    const grocery = new Grocery({
        phoneNumber: req.body.phoneNumber,
        item: req.body.item
    });
    await grocery.save();
    res.send(grocery);
}

// get all grocery items from the database
exports.getGroceries = async (req, res) => {
    const groceries = await Grocery.find({}).lean;
    res.send(groceries);
}

// get one grocery item from the database
exports.getOneGrocery = async (req, res) => {
    const grocery = await Grocery.findById(req.params.id);
    res.send(grocery);
}

// delete all grocery items from the database
exports.deleteGroceries = async (req, res) => {
    await Grocery.deleteMany();
    res.send('All groceries deleted');
}