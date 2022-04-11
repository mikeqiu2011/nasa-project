const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-type', /json/)
            .expect(200)
        // expect(response.statusCode).toBe(200)
    })
})


describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: "ZTM115",
        rocket: "mike expiriental IS1",
        launchDate: "January 17, 2030",
        destination: "Kepler-189 f"
    }

    const launchDataWithoutDate = {
        mission: "ZTM115",
        rocket: "mike expiriental IS1",
        destination: "Kepler-189 f"
    }

    test('It should respond with success', async () => {
        const resp = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-type', /json/)
            .expect(201)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(resp.body.launchDate).valueOf()

        expect(responseDate).toBe(requestDate)

        expect(resp.body).toMatchObject(launchDataWithoutDate)
    })

    test('It should catch missing required properties', async () => {
        const resp = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect(400)

        expect(resp.body).toStrictEqual({ error: 'missing required launch property' })
    })

    test('It should catch invalid dates', async () => {
        const resp = request(app)
            .post('/launches')
            .send({
                mission: "ZTM115",
                rocket: "mike expiriental IS1",
                launchDate: "hello",
                destination: "Kepler-189 f"
            })
            .expect(400)
    })
})