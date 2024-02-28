const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

const login = async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [req.body.email, req.body.password]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const register = async (req, res) => {
    try {
        const { rows } = await client.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [req.body.name, req.body.email, req.body.password]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login,
    register,
}
