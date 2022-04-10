const { parse } = require('csv-parse');
const fs = require('fs')

const habitablePlanet = []

const isHabitablePlanet = (planet) => {
    return planet.koi_disposition === 'CONFIRMED'
        && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 // not too cold or too hot
        && planet.koi_prad < 1.6  // not too big
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({ // readableStream.pipe(writebaseStream)
        comment: '#',
        columns: true
    }))
    .on('data', (planet) => {
        if (isHabitablePlanet(planet)) {
            habitablePlanet.push(planet)
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(habitablePlanet.map(planet => planet.kepler_name)); // only print name
        // habitablePlanet.map(planet => console.log(planet.kepoi_name))
        console.log(`${habitablePlanet.length} planets are habitable`);
    })

module.exports = {
    planets: habitablePlanet // rename the exports
}