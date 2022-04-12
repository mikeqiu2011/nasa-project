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
    const launch = await launches.findOne({
        flightNumber: flightNumber
    })
    return launch != null
}


// works only with data, and define how the data is exported
async function getAllLaunches() {
    return await launches.find({}, {
        _id: 0,
        __v: 0
    })
}

async function deleteLaunch(flightNumber) {
    const launch = await launches.findOne({
        flightNumber: flightNumber
    })
    launch.upcoming = false // keep the record, just mark it as aborted
    launch.success = false

    await saveLaunch(launch)
    // launches.delete(launchId)

    return launch
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

saveLaunch(launch)

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
    existsLaunchWithId,
}