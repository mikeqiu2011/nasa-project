const launches = new Map()

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

module.exports = {
    launches
}