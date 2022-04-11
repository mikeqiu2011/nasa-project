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
    test('It should respond with success', async () => {
        const resp = await request(app)
            .post('/launches')
            .send({
                mission: "ZTM115",
                rocket: "mike expiriental IS1",
                launchDate: "January 17, 2030",
                destination: "Kepler-189 f"
            })
            .expect('Content-type', /json/)
            .expect(201)
    })

    test('It should catch missing required properties', async () => {
        const resp = await request(app)
            .post('/launches')
            .send({
                mission: "ZTM115",
                rocket: "mike expiriental IS1",
                launchDate: "January 17, 2030",
            })
            .expect(400)
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