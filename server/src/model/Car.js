const { mongoose } = require('mongoose');

//TO DO add err messages
const carSchema = new mongoose.Schema({
    ImageBitmapRenderingContext: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [3, 'Name must be at least 2 characters!'],

    },
    type: {
        type: String,
        required: [true, 'Type is required!'],
        minLength: [2, 'Type must be at least 2 characters!'],


    },
    production_date: {
        type: Number,
        required: [true, 'Production is required!'],
        validate: {
            validator: (value) => 1900 >= value <= 2024,
            message: 'Production year must be between 1900 - 2024 year!'
        }
    },
    horse_power: {
        type: Number,
        required: [true, 'Horse power is required!'],
        validate: {
            validator: (value) => value >= 0,
            message: 'Horse power must be possitive number!'
        }
    },
    engine: {
        type: String,
        required: [true, 'Engine is required!'],
        minLength: [2, 'Engine must be at least 2 characters long!']
    },
    // todo - naprawi go s dwa izbora!
    transmission: {
        type: String,
        required: [true, 'Transmission is required!'],
        minLength: [2, 'Transmission must be at least 10 characters long!']
    },
    image: {
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
    // todo - naprawi go s dwa izbora!
    car_condition: {
        type: String,
        required: [true, 'Car condition is required!'],
        minLength: [2, 'Car condition must be at least 10 characters long!']
    },
    body: {
        type: String,
        required: [true, 'Body is required!'],
        minLength: [2, 'Body must be at least 10 characters long!']
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