const mongoose = require('mongoose');

var autoSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: 'This field is required.'//обязательное
    },
    model: {
        type: String
    },
    mileage: {
        type: String
    },
    year: {
        type: String
    }
});


mongoose.model('Car', autoSchema);
