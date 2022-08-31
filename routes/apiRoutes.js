const router = require('express').Router();
const groceryController = require('../controller/groceryController');

router.post('/groceries', groceryController.addGroceries);
router.get('/groceries', groceryController.getGroceries);
router.get('/groceries/:id', groceryController.getOneGrocery);
router.delete('/groceries/:id', groceryController.deleteGroceries);

module.exports = router;