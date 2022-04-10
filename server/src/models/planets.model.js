const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse');

const habitablePlanet = []

const isHabitablePlanet = (planet) => {
    return planet.koi_disposition === 'CONFIRMED'
        && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 // not too cold or too hot
        && planet.koi_prad < 1.6  // not too big
}

function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
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
                reject(err)  // when error then reject
            })
            .on('end', () => {
                console.log(`${habitablePlanet.length} planets are habitable`);
                resolve() // no need to return planet, only need to wait until end then resolve
            })
    })
}

function getAllPlanets() {
    return habitablePlanet
}


// modules are exported and used before the data is properly loaded
module.exports = {
    loadPlanetsData,
    getAllPlanets
}

/*
const promise = new Promise((resolve, reject)=>{
    resolve(42)
})
promise.then((result)=>{
    // do something after get the result of 42
})
or
const result = await promise
console.log(result)
*/