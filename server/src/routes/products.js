const express = require('express')
const router = express.Router()

const pg = require('pg')
const client = new pg.Client(process.env.DATABASE_URL)

client.connect()

router.get('/', async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM products')
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT * FROM products WHERE id = $1',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const { rows } = await client.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [req.body.name, req.body.price]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { rows } = await client.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
            [req.body.name, req.body.price, req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await client.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
})

module.exports = router
