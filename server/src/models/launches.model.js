const launches = new Map()
let latestFlightNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-1652 b',
    customers: ['NASA', 'CITI'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)


// works only with data, and define how the data is exported
function getAllLaunches() {
    return Array.from(launches.values())  // consumer does not need to care the details, just get a json back
}

function addLaunch(launch) {
    latestFlightNumber++

    // user only need to send necessary info, others can be cal by server
    launches.set(latestFlightNumber, Object.assign(launch, {
        flightNumber: latestFlightNumber,
        customers: ['Mike', 'NAZA'],
        upcoming: true,
        success: true,
    }))
}

module.exports = {
    getAllLaunches,
    addLaunch
}