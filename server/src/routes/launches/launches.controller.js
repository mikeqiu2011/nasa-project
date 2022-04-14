const launchesModel = require('../../models/launches.model')

async function getAllLaunches(req, res) {
    console.log(req.query);
    return res.status(200).json(await launchesModel.getAllLaunches())
}

async function deleteLaunch(req, res) {
    let id = Number(req.params.id)
    console.log(id);
    const existLaunch = await launchesModel.existsLaunchWithId(id)

    if (!existLaunch) {
        return res.status(404).json({ error: 'launch id not found' })
    }

    // id exists, now delete
    const aborted = await launchesModel.deleteLaunch(id)
    if (!aborted) {
        return res.status(500).json({
            error: 'unable to delete in server'
        })
    }

    return res.status(200).json({ ok: true })

}

async function addLaunch(req, res) {
    let launch = req.body

    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.destination) {
        return res.status(400).json({ error: 'missing required launch property' })
    }

    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) { // Date obj will convert to unix timestamp and check
        return res.status(400).json({ error: 'invalid launch date' })
    }

    await launchesModel.addLaunch(launch)

    return res.status(201).json(launch)

}

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
}