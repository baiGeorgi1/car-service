const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const User = require('../model/User');
const Car = require('../model/Car.js');



const URI = 'mongodb://localhost:27017/car-shop';

async function dbConnect() {
    const connectWithRetry = () => {
        mongoose.connect(URI)
            .then()
            .catch((err) => {
                console.error('MongoDB connection error:', err);
                setTimeout(connectWithRetry, 10000); // повторен опит след 10 секунди
            });
    };
    await connectWithRetry();

    // **DATA reading**
    const usersPath = path.resolve(__dirname, '../../data/car-shop.users.json');
    const carPath = path.resolve(__dirname, '../../data/car-shop.cars.json');

    try {
        const userData = fs.readFileSync(usersPath, 'utf-8');
        const carData = fs.readFileSync(carPath, 'utf-8');

        const users = JSON.parse(userData);
        const cars = JSON.parse(carData);
        // ** Import users **

        const dataImport = async () => {
            try {


                const userExist = await User.countDocuments({});
                const carExist = await Car.countDocuments({});

                if (userExist === 0) {
                    console.log('Importing users ...');
                    const userObj = convertFields(users);
                    await User.insertMany(userObj);
                    console.log('Users imported! ');
                }
                if (carExist === 0) {
                    console.log('Importing cars...');
                    const carObj = convertFields(cars);
                    await Car.insertMany(carObj);
                    console.log('Cars imported successfully!');
                }
            } catch (error) {
                console.error('Error during data import:', error);
            }
        };
        await dataImport();

    } catch (fileError) {
        return console.log('Error reading JSON files:', fileError);


    }

    function convertFields(data) {
        return data.map(doc => {
            if (doc._id && typeof doc._id === 'object' && doc._id.$oid) {
                doc._id = new mongoose.Types.ObjectId(doc._id.$oid);
            }
            if (doc.owner && typeof doc.owner === 'object' && doc.owner.$oid) {
                doc.owner = new mongoose.Types.ObjectId(doc.owner.$oid);
            }
            return doc;
        });
    }



}
module.exports = dbConnect;