const client = require('../config/client')

const getAllProducts = async (req, res) => {
    try {
        // get all products where available is true
        if (req.isAdmin) {
            const { rows } = await client.query('SELECT * FROM product')
            res.status(200).json(rows)
        }
        const { rows } = await client.query('SELECT * FROM product WHERE available = true')
        res.status(200).json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createProduct = async (req, res) => {
    try {
        if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' })
        const { rows } = await client.query('INSERT INTO product (name, price) VALUES ($1, $2) RETURNING *', [
            req.body.name,
            req.body.price,
        ])
        res.status(201).json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getProductById = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ message: 'Product ID is required' })

    try {
        const { rows } = await client.query('SELECT * FROM product WHERE id = $1', [req.params.id])
        res.json(rows[0])
    } catch (error) {
        console.error(error)
    }
}

const updateProduct = async (req, res) => {
    const { name, description, price, quantity, available, image_url } = req.body
    try {
        if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' })
        const { rows } = await client.query(
            'UPDATE product SET name = $1, description = $2, price = $3, quantity = $4, available = $5, image_url = $6 WHERE id = $7 RETURNING *',
            [name, description, price, quantity, available, image_url, req.params.id]
        )
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized' })
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
