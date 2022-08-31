const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const twilio = require('twilio');
const bp = require('body-parser');
require('./db')
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);


const app = express();

app.use('/api', apiRoutes);

app.post('/', (req, res) => {
    // Use the REST client to send a text message
    client.messages.create({
        to: req.body.phoneNumber,
        from: TWILIO_PHONE_NUMBER,
        body: 'Welcome to the Grocery List API!'
     }).then(function(message) {
        // When we get a response from Twilio, respond to the HTTP POST request
        res.send('Message is inbound!');
     });
});

 app.post('/hello', function(req, res, next) {
    // Create a TwiML generator
    let twiml = new twilio.twiml.MessagingResponse();
    twiml.message('Hello there!');
    twiml.message('Please text "hello" to this number to start the conversation.');
      
    // Return an XML response to this request
    res.set('Content-Type','text/xml');
    res.send(twiml.toString());
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
})