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

const randomString = Math.random().toString(36).substring(2, 15)

const randomUser = {
    email: `${randomString}@test.com`,
    password: 'password',
}

const user = {
    email: 'mat@mat.com',
    password: 'password123',
}

describe('Auth', () => {
    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    first_name: 'randomString',
                    last_name: 'User',
                    ...user,
                })
            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('user')
            expect(response.body.user).toHaveProperty('id')
            expect(response.body.user).toHaveProperty('email')
            expect(response.body.user).toHaveProperty('first_name')
            expect(response.body.user).toHaveProperty('last_name')
            expect(response.body.user).toHaveProperty('is_admin')
            expect(response.body.user).toHaveProperty('token')
        })
    })
    describe('POST /api/auth/login', () => {
        it('should login a user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    ...user,
                })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('accessToken')
        })
    })
})
