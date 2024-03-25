const { app, client, init } = require('../server/index')
const request = require('supertest')

beforeAll(async () => {
    await init() // Start the server
    console.log('client has started')
})

afterAll(async () => {
    await client.end() // Close the database connection
    console.log('client has disconnected')
})

describe('Get All Products', () => {
    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const response = await request(app).get('/api/products')
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
            expect(response.body[0]).toHaveProperty('available')
            expect(response.body[0].available).toBe(true)
        })
    })
})
