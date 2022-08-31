const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:leollewynleica@cluster0.djtqv0x.mongodb.net/groceryList?retryWrites=true&w=majority');

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected at port 8080");
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
