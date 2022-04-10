const express = require('express')
const launchesRouter = express.Router()
const {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
} = require('./launches.controller')

launchesRouter.get('/', getAllLaunches)
launchesRouter.post('/', addLaunch)
launchesRouter.delete('/:id', deleteLaunch)

module.exports = launchesRouter