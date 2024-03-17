const client = require('../config/client')

const getAllProducts = async (req, res) => {
    try {
        // get all products where available is true
        const { rows } = await client.query('SELECT * FROM product WHERE available = true')
        res.status(200).json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createProduct = async (req, res) => {
    try {
        const { rows } = await client.query('INSERT INTO product (name, price) VALUES ($1, $2) RETURNING *', [
            req.body.name,
            req.body.price,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getProductById = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM product WHERE id = $1', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { rows } = await client.query('UPDATE product SET name = $1, price = $2 WHERE id = $3 RETURNING *', [
            req.body.name,
            req.body.price,
            req.params.id,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { rows } = await client.query('DELETE FROM product WHERE id = $1 RETURNING *', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
}
