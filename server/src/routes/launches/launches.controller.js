const { launches } = require('../../models/launches.model')

function getAllLaunches(req, res) {
    // make sure only set response once, so add return so that function stops running
    // lauches is of type Map cannot be returned directly
    return res.status(200).json(Array.from(launches.values()))
}

module.exports = {
    getAllLaunches
}