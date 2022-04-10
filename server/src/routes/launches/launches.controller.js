const launchesModel = require('../../models/launches.model')

function getAllLaunches(req, res) {
    // make sure only set response once, so add return so that function stops running
    // lauches is of type Map cannot be returned directly
    // return res.status(200).json(Array.from(launches.values()))
    return res.status(200).json(launchesModel.getAllLaunches())
}

function addLaunch(req, res) {
    let launch = req.body
    if (launch) {
        launch.launchDate = new Date(launch.launchDate)
        launchesModel.addLaunch(launch)

        return res.status(201).json(launch)
    } else {
        return res.status(400)
    }
}

module.exports = {
    getAllLaunches,
    addLaunch
}