const Grocery = require('../model/Grocery');

// add Grocery
exports.addGroceries = async (req, res) => {
    let grocery = new Grocery(req.body);
    await grocery.save();
    res.xml(grocery);
}

// get all Groceries 
exports.getGroceries = async (req, res) => {
    let groceries = await Grocery.find({}).lean;

    if(!groceries) {
        res.status(404).xml({ message: 'No items found' });
    }
    res.xml(groceries);

}

// get one Grocery
exports.getOneGrocery = async (req, res) => {
    let grocery = await Grocery.findById(req.params._id);

    if (!grocery) {
        res.status(404).xml({ message: 'Item not found' });
    }
    res.xml(grocery);

}

// delete Grocery
exports.deleteGroceries = async (req, res) => {
    let grocery = await Grocery.deleteMany({});
    
    if(!grocery) {
        res.status(404).xml({ message: 'Item not found' });
    }
    res.xml(grocery);
}