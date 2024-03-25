const { app, client, init } = require('../server/index')
const request = require('supertest')

const user = {
    email: 'mat@mat.com',
    password: 'password123',
}
const user2 = {
    email: 'second@user.com',
    password: 'password123',
}

module.exports = user

beforeAll(async () => {
    await init() // Start the server
    console.log('client has started')
})

afterAll(async () => {
    await client.end() // Close the database connection
    console.log('client has disconnected')
})

describe('Auth', () => {
    describe('POST /api/auth/register', () => {
        it('It should try to register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    first_name: 'randomString',
                    last_name: 'User',
                    ...user,
                })
            // if the user already exists, the status code should be 400 else 201
            if (response.status === 400) {
                expect(response.body).toHaveProperty('message')
                expect(response.body.message).toBe('User already exists')
            } else {
                expect(response.status).toBe(201)
                expect(response.body).toHaveProperty('user')
                expect(response.body.user).toHaveProperty('id')
                expect(response.body.user).toHaveProperty('email')
                expect(response.body.user).toHaveProperty('first_name')
                expect(response.body.user).toHaveProperty('last_name')
                expect(response.body.user).toHaveProperty('is_admin')
                expect(response.body.user).toHaveProperty('password')
                expect(response.body.user).toHaveProperty('token')
            }
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
            expect(response.body).toHaveProperty('message')
            expect(response.body.user).toHaveProperty('accessToken')
        })
    })
})
