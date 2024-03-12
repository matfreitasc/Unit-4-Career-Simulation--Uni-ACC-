const client = require('../config/client')

const getAllOrders = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM orders')
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createOrder = async (req, res) => {
    try {
        const { rows } = await client.query('INSERT INTO orders (user_id, product_id) VALUES ($1, $2) RETURNING *', [
            req.body.user_id,
            req.body.product_id,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getOrderById = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM orders WHERE id = $1', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const updateOrder = async (req, res) => {
    try {
        const { rows } = await client.query(
            'UPDATE orders SET user_id = $1, product_id = $2 WHERE id = $3 RETURNING *',
            [req.body.user_id, req.body.product_id, req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { rows } = await client.query('DELETE FROM orders WHERE id = $1 RETURNING *', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}
