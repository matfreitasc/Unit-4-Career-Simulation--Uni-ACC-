const pg = require('pg')
const bcrypt = require('bcrypt')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

const login = async (req, res) => {
    const { email, password } = req.body

    if ((!email, !password)) {
        res.status(400).send('Email and password are required')
    }

    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        const user = rows[0]

        if (user) {
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            )

            if (isPasswordCorrect) {
                res.status(200).json({
                    message: 'Login successful',
                    user: {
                        id: user.id,
                        ...user,
                    },
                })
            } else {
                res.status(401).send('Invalid email or password')
            }
        } else {
            res.status(401).send('Invalid email or password')
        }
    } catch (error) {
        res.status(500).send('Server error')
    }
}

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body

    if ((!email, !password)) {
        res.status(400).send('Email and password are required')
    }
    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )
        const user = rows[0]

        if (user) {
            res.status(409).send('Email already exists')
        } else {
            const hashedPassword = await bcrypt.hash(password, 15)
            await client.query(
                'INSERT INTO users (first_name,last_name, email, password) VALUES ($1, $2, $3,$4)',
                [first_name, last_name, email, hashedPassword]
            )
            // after user creating the user, login the user
            const { rows } = await client.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            )
            const user = rows[0]
            res.status(201).json({
                message: 'User created',
                user: {
                    ...user,
                    id: user.id,
                },
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Server error')
    }
}

module.exports = {
    login,
    register,
}
