const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../model/User');
const Car = require('../model/Car.js');



const URI = 'mongodb://localhost:27017/car-shop';

async function dbConnect() {
    const connectWithRetry = () => {
        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then()
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                setTimeout(connectWithRetry, 10000); // повторен опит след 10 секунди
            });
    };
    await connectWithRetry();

    // // **DATA reading**
    // const usersPath = path.resolve(__dirname, '../../data/car-shop.users.json');
    // const carPath = path.resolve(__dirname, '../../data/car-shop.cars.json');

    // const userData = fs.readFileSync(usersPath, 'utf-8');
    // const carData = fs.readFileSync(carPath, 'utf-8');

    // const users = JSON.parse(userData);
    // const cars = JSON.parse(carData);

    // // ** Import users **
    // const dataImport = async () => {
    //     const userExist = await User.exists({});
    //     const carExist = await Car.exists({});

    //     if (!userExist) {

    //         for (const userdata of users) {
    //             if (userdata._id && typeof userdata._id === 'string') {
    //                 userdata._id = mongoose.Types.ObjectId(userdata._id);
    //             }
    //             const user = new User(userdata);
    //             await user.save();
    //         }
    //     }
    //     if (!carExist) {
    //         for (const carData of cars) {
    //             const car = new Car(carData);
    //             await car.save();
    //         }
    //     }
    // };
    // await dataImport();
}
module.exports = dbConnect;