// represent data access layer, hide details of Mongo or other dbms

const launches = require('./launches.mongo')

// const launches = new Map()
// let latestlaunchId = 100

const launch = {
    launchId: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    // destination: 'Kepler-1652 b',
    destination: 'mike',  // now there is no integrity checking with planet collection
    customers: ['NASA', 'CITI'],
    upcoming: true,
    success: true,
}

async function saveLaunch(launch) {
    await launches.updateOne({
        launchId: launch.launchId
    }, launch, {
        upsert: true
    })
}

saveLaunch(launch)
// launches.set(launch.launchId, launch)

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}


// works only with data, and define how the data is exported
async function getAllLaunches() {
    return await launches.find({}, {
        _id: 0,
        __v: 0
    })
    // return Array.from(launches.values())  // consumer does not need to care the details, just get a json back
}

function deleteLaunch(launchId) {
    const launch = launches.get(launchId)
    launch.upcoming = false // keep the record, just mark it as aborted
    launch.success = false
    // launches.delete(launchId)

    return launch
}

function addLaunch(launch) {
    latestlaunchId++

    // user only need to send necessary info, others can be cal by server
    launches.set(latestlaunchId, Object.assign(launch, {
        launchId: latestlaunchId,
        customers: ['Mike', 'NAZA'],
        upcoming: true,
        success: true,
    }))
}

module.exports = {
    getAllLaunches,
    addLaunch,
    deleteLaunch,
    existsLaunchWithId,
}