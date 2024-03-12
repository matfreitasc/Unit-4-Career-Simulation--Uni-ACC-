const client = require('../config/client')

const getAllUsers = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { rows } = await client.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [
            req.body.name,
            req.body.email,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const { rows } = await client.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [
            req.body.name,
            req.body.email,
            req.params.id,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const { rows } = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
}
