const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000

const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASS}@nasacluster.c9kez.mongodb.net/nasa?retryWrites=true&w=majority`

const { loadPlanetsData } = require('./models/planets.model')

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready');
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

async function startServer() {
    // make sure data is ready before serving, a very common pattern
    await mongoose.connect(MONGO_URL,)
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log('server is listening on port', PORT);
    })
}

startServer()


