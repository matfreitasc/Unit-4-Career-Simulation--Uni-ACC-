const pg = require('pg')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30s',
        })
        const refreshToken = jwt.sign({ email: user.email, id: user.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
        })
        await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *', [refreshToken, user.id])

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
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

const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        res.clearCookie('jwt', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.sendStatus(204)
    }

    const refreshToken = cookies.jwt
    const user = await client.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])

    if (!user.rows[0]) {
        res.clearCookie('jwt', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        })
        return res.sendStatus(204)
    }

    await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *', [null, user.rows[0].id])
    res.clearCookie('jwt', {
        httpOnly: true,
        // secured: true,
        maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).send('User logged out')
}

const refreshToken = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt
    const user = await client.query('SELECT * FROM users WHERE refresh_token = $1', [refreshToken])

    if (!user.rows[0]) return res.status(403).send('Forbidden')
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error || user.rows[0].email !== decoded.email) return res.status(403).send('Forbidden')
        const accessToken = jwt.sign(
            { email: user.rows[0].email, id: user.rows[0].id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30s',
            }
        )
        res.status(200).json({
            accessToken,
        })
    })
}

module.exports = {
    login,
    register,
    logout,
    refreshToken,
}
