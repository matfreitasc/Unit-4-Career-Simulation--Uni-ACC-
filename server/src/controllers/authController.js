const pg = require('pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validate } = require('uuid')

const client = new pg.Client(process.env.DATABASE_URL)

require('dotenv').config()
client.connect()

const login = async (req, res) => {
    const { email, password } = req.body

    if ((!email, !password)) return res.status(400).send('Email and password are required')

    const findUser = await client.query('SELECT * FROM users WHERE email = $1', [email])
    const user = findUser.rows[0]
    if (!user) return res.status(404).send('User not found')
    const validPassword = await bcrypt.compare(password, user.password)
    if (validPassword) {
        const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET)
        const refreshToken = jwt.sign({ email: user.email, id: user.id }, process.env.REFRESH_TOKEN_SECRET)
        await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *', [refreshToken, user.id])

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none',
        })
        res.status(200).json({
            message: 'User logged in',
            accessToken,
        })
    } else {
        res.status(403).send('Invalid email or password')
    }
}

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    if ((!email, !password)) return res.status(400).send('Email and password are required')

    const findUser = await client.query('SELECT * FROM users WHERE email = $1', [email])
    const user = findUser.rows[0]
    if (user) return res.status(400).send('User already exists')
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await client.query(
        'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, email, hashedPassword]
    )
    res.status(201).json({
        message: 'User created',
        user: {
            ...newUser.rows[0],
            id: newUser.rows[0].id,
        },
    })
}

module.exports = {
    login,
    register,
}
