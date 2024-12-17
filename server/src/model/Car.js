const mongoose = require('mongoose');


//TO DO add err messages
const carSchema = new mongoose.Schema({
    model: {
        type: String,
        required: [true, 'Model is required!'],
        minLength: [2, 'Model must be at least 2 characters!'],

    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [2, 'Type must be at least 2 characters!'],


    },
    year: {
        type: Number,
        required: [true, 'Insert year of production!'],
        validate: {
            validator: (value) => 1900 >= value <= 2024,
            message: 'Production year must be between 1900 - 2024 year!'
        }
    },
    hp: {
        type: Number,
        required: [true, 'Horse power is required!'],
        validate: {
            validator: (value) => value >= 0,
            message: 'Horse power must be possitive number!'
        }
    },

    transmission: {
        type: String,
        required: [true, 'Transmission is required!'],
        minLength: [2, 'Transmission must be at least 10 characters long!']
    },
    imageUrl: {
        type: String,
        required: [true, 'Add image please!'],
        matcth: [/^[https?:]+\/\//gm, 'Invalid image addres!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: (value) => value >= 0,
            message: 'The price must be possitive number!'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [10, 'Description must be between 5 and 200 characters long!'],
        maxLength: [200, 'Description must be between 5 and 200 characters long!']

    },
    buyingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;