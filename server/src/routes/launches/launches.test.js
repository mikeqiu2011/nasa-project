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
    test('It should respond with 200', () => {

    })

    test('It should catch missing required properties', () => {

    })

    test('It should catch invalid dates', () => {

    })
})