const { app, client, init } = require('../server/index')
const request = require('supertest')

const user = {
    email: 'mat@mat.com',
    password: 'password123',
}

let token
let users

module.exports = user

beforeAll(async () => {
    await init() // Start the server
    console.log('client has started')

    // Log in the user before testing
    const response = await request(app).post('/api/auth/login').send(user)

    console.log('User logged in')
    console.log(response.body)

    // Store the token in the token variable
    token = response.body.user.accessToken
})

afterAll(async () => {
    await client.end() // Close the database connection

    console.log('client has disconnected')
})

describe('User Controller', () => {
    describe('GET /api/users', () => {
        it('should return all users', async () => {
            const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)
            users = res.body.users
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('users')
        })
    })

    describe('GET /api/users/:id', () => {
        it('should return a single user', async () => {
            const res = await request(app).get(`/api/users/${users[0].id}`).set('Authorization', `Bearer ${token}`)
            console.log('Get single User Response', res.body)
            expect(res.statusCode).toEqual(200)
        })
    })

    describe('PUT /api/users/:id', () => {
        it('should update an existing user', async () => {
            const res = await request(app)
                .put(`/api/users/${users[0].id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    id: users[0].id,
                    name: 'Updated name',
                    email: 'updatedemail@gmail.com',
                })
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('user')
        })
    })
})
