const http = require('http')
const app = require('./app')
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    // make sure data is ready before serving, a very common pattern
    await mongoConnect()
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log('server is listening on port', PORT);
    })
}

startServer()


