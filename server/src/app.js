const express = require('express')
const cors = require('cors')
const path = require('path')
const planetsRouter = require('./routes/planets/planets.router')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000' // only allow from our frontend
})) // by default it allows all which is not secure
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', planetsRouter) // now will get CORS blocked error

module.exports = app