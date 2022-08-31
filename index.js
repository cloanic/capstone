const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const smsController = require('./controller/smsController');
const twilio = require('twilio');
require('./db')
require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_PHONE_NUMBER);


const app = express();

app.use('/api', apiRoutes);
app.use('/sms', smsController);


app.listen(8080, () => {
    console.log('Server is running on port 8080');
})