const express = require('express')
const planetsRouter = require('./routes/planets/planets.router')

const app = express()

app.use(express.json())
app.use('/planets', planetsRouter) // now will get CORS blocked error

module.exports = app