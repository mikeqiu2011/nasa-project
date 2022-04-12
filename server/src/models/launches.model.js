// represent data access layer, hide details of Mongo or other dbms

const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHTNUMBER = 100

// const launches = new Map()
// let latestlaunchId = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-1652 b',
    // destination: 'mike',  // now there is no integrity checking with planet collection
    customers: ['NASA', 'CITI'],
    upcoming: true,
    success: true,
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.destination
    })
    if (!planet) {
        throw new Error('No matching planet found, save aborted')
    }
    await launches.findOneAndUpdate({  // solves the "$setOnInsert" feedback problem
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })

}


async function getLatestFlightNumber() {
    // const launches = await getAllLaunches()
    const latestLaunch = await launches.findOne({})
        .sort('-flightNumber')

    if (!latestLaunch) {
        return DEFAULT_FLIGHTNUMBER
    }

    return latestLaunch.flightNumber
}

async function existsLaunchWithId(flightNumber) {
    return await launches.findOne({
        flightNumber: flightNumber
    })
}


// works only with data, and define how the data is exported
async function getAllLaunches() {
    return await launches.find({}, {
        _id: 0,
        __v: 0
    })
}

async function deleteLaunch(flightNumber) {
    const aborted = await launches.updateOne({
        flightNumber: flightNumber
    }, {
        upcoming: false,
        success: false
    })  // we dont use upsert this time

    const launch = await launches.findOne({
        flightNumber: flightNumber
    })

    return aborted.acknowledged
}

async function addLaunch(launch) {
    const flightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        flightNumber: flightNumber,
        customers: ['Mike', 'NAZA'],
        upcoming: true,
        success: true,
    })

    await saveLaunch(newLaunch)
}

// saveLaunch(launch)

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
    existsLaunchWithId,
}