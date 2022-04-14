// represent data access layer, hide details of Mongo or other dbms
const axios = require('axios').default

const launches = require('./launches.mongo')
const planets = require('./planets.mongo')

const DEFAULT_FLIGHTNUMBER = 100


async function saveLaunch(launch) {
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

async function findLaunch(filter) {
    return await launches.findOne(filter)
}

async function existsLaunchWithId(flightNumber) {
    return await launches.findOne({
        flightNumber: flightNumber
    })
}


// works only with data, and define how the data is exported
async function getAllLaunches(limit, skip) {
    return await launches.find({}, {
        _id: 0,
        __v: 0
    })
        .sort({ flightNumber: 1 })  // 1 is asc, -1 is dsc
        .skip(skip).limit(limit)
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
    const planet = await planets.findOne({
        keplerName: launch.destination
    })
    if (!planet) {
        throw new Error('No matching planet found, save aborted')
    }
    const flightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        flightNumber: flightNumber,
        customers: ['Mike', 'NAZA'],
        upcoming: true,
        success: true,
    })

    await saveLaunch(newLaunch)
}


async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        mission: 'FalconSat',
        rocket: 'Falcon 1',
    })

    if (firstLaunch) {
        console.log('Launch data already exists, quit load launch data');
        return
    }

    await loadLaunchesFromSpaceX()
}

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
    existsLaunchWithId,
    loadLaunchData
}

async function loadLaunchesFromSpaceX() {
    const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'
    console.log('Downloading launch data')
    // fetch data from spaceX API
    const res = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: "rocket",
                    select: {
                        name: 1
                    }
                },
                {
                    path: "payloads",
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    })

    if (res.status != 200) {
        throw new Error('launch data download failed')
    }

    const launchDocs = res.data.docs
    for (const launchDoc of launchDocs) {
        const payloads = launchDoc.payloads
        const customers = payloads.flatMap((payload) => {
            return payload.customers
        })

        const launch = {
            flightNumber: launchDoc.flight_number,
            mission: launchDoc.name,
            rocket: launchDoc.rocket.name,
            launchDate: launchDoc.date_local,
            destination: '',
            customers: customers,
            upcoming: launchDoc.upcoming,
            success: launchDoc.success
        }

        console.log(`${launch.flightNumber} ${launch.mission} ${launch.customers}`)

        await saveLaunch(launch)
    }
}
