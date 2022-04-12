const mongoose = require('mongoose')

const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASS}@nasacluster.c9kez.mongodb.net/nasa?retryWrites=true&w=majority`

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

module.exports = {
    mongoConnect
}