const Grocery = require('../model/Grocery');
const twilio = require('twilio');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);
const router = require('express').Router();
require('dotenv').config();


router.get('/', async (req,res) => {
    res.send("Welcome to the Grocery List API");
})

// Send a text message to the user with their added grocery list
router.post('/sms', async (req, res) => {
    let twiml = new MessagingResponse();
    if (req.body.Body == 'list') {
        const groceries = await Grocery.find();
        twiml.message(groceries.map(grocery => grocery.item).join('\n'));
    } else if (req.body.Body == 'add') {
        twiml.message('Please text the item you would like to add to the list.');
        // Save the item to the database
        const grocery = new Grocery({
            phoneNumber: req.body.From,
            item: req.body.Body
        });
        await grocery.save();
    } else if (req.body.Body == 'delete') {
        twiml.message('Deleting all of the listed items');
        await Grocery.deleteMany();
    } else {
      twiml.message(
        'No Body param match, Twilio sends this in the request to your server.'
      );
    }
  
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
} )

module.exports = router;