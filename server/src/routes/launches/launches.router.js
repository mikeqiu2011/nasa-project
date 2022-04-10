const express = require('express')
const launchesRouter = express.Router()
const {
    getAllLaunches,
    addLaunch
} = require('./launches.controller')

launchesRouter.get('/', getAllLaunches)
launchesRouter.post('/', addLaunch)

module.exports = launchesRouter