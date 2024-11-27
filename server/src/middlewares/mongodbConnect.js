const mongoose = require('mongoose');

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
    connectWithRetry();
}
module.exports = dbConnect;