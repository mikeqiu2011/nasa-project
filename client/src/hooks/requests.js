const API_ENDPOINT = 'http://localhost:8000/v1'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const res = await fetch(API_ENDPOINT + '/planets')
  return await res.json()
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const res = await fetch(API_ENDPOINT + '/launches')
  const launches = await res.json()
  return launches.sort((a, b) => {   // sort in JS
    return a.flightNumber - b.flightNumber
  })

}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  console.log(launch);
  return await fetch(API_ENDPOINT + '/launches', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch)
  })
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(API_ENDPOINT + '/launches/' + id, {
      method: 'DELETE',
    })
  } catch (error) {  // if error like network
    console.log(error);
    return {
      ok: false
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};