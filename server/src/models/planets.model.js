const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse');
const planets = require('./planets.mongo')

const isHabitablePlanet = (planet) => {
    return planet.koi_disposition === 'CONFIRMED'
        && planet.koi_insol > 0.36 && planet.koi_insol < 1.11 // not too cold or too hot
        && planet.koi_prad < 1.6  // not too big
}

async function loadPlanetsData() {
    const planet = await planets.findOne({
        keplerName: "Kepler-1652 b"
    })
    if (planet) {
        console.log('planet data already loaded');
        return
    }
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({ // readableStream.pipe(writebaseStream)
                comment: '#',
                columns: true
            }))
            .on('data', async (planet) => {
                if (isHabitablePlanet(planet)) {
                    // if we use create, same doc will be inserted multiple times
                    await savePlanet(planet);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err)  // when error then reject
            })
            .on('end', async () => {
                const result = await getAllPlanets()

                console.log(`${result.length} planets are habitable`);
                resolve() // no need to return planet, only need to wait until end then resolve
            })
    })
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name, // find the one first
        }, {
            keplerName: planet.kepler_name, // if found, update, if not found, insert
        }, {
            upsert: true
        });
    } catch (error) {
        console.error('could not save planet', error);
    }
}

async function getAllPlanets() {
    // return planets.find({
    //     keplerName: 'Kepler-62 f'  // filter only name matches
    // }, 'keplerName -anotherField') // return only necessary field

    return await planets.find({}, {
        '_id': 0,
        '__v': 0,
    }) // now will return all
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