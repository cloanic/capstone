const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
require('./db')
require('dotenv').config();

const app = express();

app.use('/api', apiRoutes);


app.listen(8080, () => {
    console.log('Server is running on port 8080');
})