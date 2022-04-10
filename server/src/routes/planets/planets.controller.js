const planetsModel = require('../../models/planets.model')

function getAllPlanets(req, res) {
    // make sure only set response once, so add return so that function stops running
    // console.log(planets);
    return res.status(200).json(planetsModel.getAllPlanets())
}

module.exports = {
    getAllPlanets
}