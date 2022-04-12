const launchesModel = require('../../models/launches.model')

async function getAllLaunches(req, res) {
    // make sure only set response once, so add return so that function stops running
    // lauches is of type Map cannot be returned directly
    // return res.status(200).json(Array.from(launches.values()))
    return res.status(200).json(await launchesModel.getAllLaunches())
}

function deleteLaunch(req, res) {
    let id = Number(req.params.id)
    console.log(id);

    if (!launchesModel.existsLaunchWithId(id)) {
        return res.status(404).json({ error: 'launch id not found' })
    }

    // id exists, now delete
    const launch = launchesModel.deleteLaunch(id)

    return res.status(200).json(launch)

}

function addLaunch(req, res) {
    let launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.destination) {
        return res.status(400).json({ error: 'missing required launch property' })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) { // Date obj will convert to unix timestamp and check
        return res.status(400).json({ error: 'invalid launch date' })
    }

    launchesModel.addLaunch(launch)

    return res.status(201).json(launch)

}

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
}