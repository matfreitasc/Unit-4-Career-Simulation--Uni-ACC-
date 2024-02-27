const express = require('express')
const router = express.Router()

const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

router.post('/signup', async (req, res) => {
    try {
        const { rows } = await client.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [req.body.name, req.body.email, req.body.password]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [req.body.email, req.body.password]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
