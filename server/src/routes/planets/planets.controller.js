const planets = []

function getAllPlanets(req, res) {
    // make sure only set response once, so add return
    return res.status(200).json(planets)
}

module.exports = {
    getAllPlanets
}