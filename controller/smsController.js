const Grocery = require('../model/Grocery');
const router = require('express').Router();
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);


// add grocery item and send it with twilio sms
router.post('/groceries', async (req, res) => {
    const grocery = new Grocery({
        phoneNumber: req.body.phoneNumber,
        item: req.body.item
    });
    await grocery.save();
    res.send(grocery);
}).post('/sms', async (req, res) => {
    const grocery = await Grocery.find({}).lean();
    const groceryItem = grocery.map(item => item.item);
    const groceryItemString = groceryItem.join(', ');
    client.messages.create({
        body: `${groceryItemString}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.phoneNumber
    }).then(message => {
        console.log(message.sid);
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        res.send('Message sent');
    });
})

// delete all grocery items from the database and send a sms with twilio
router.delete('/groceries', async (req, res) => {
    await Grocery.deleteMany();
    res.send('All groceries deleted');
}).post('/sms', async (req, res) => {
    client.messages.create({
        body: `All groceries deleted`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: req.body.phoneNumber
    }).then(message => {
        console.log(message.sid);
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        res.send('Message sent');
    })
})