const client = require('../config/client')

const getAllUsers = async (req, res) => {
    try {
        const { rows } = await client.query(
            'SELECT id, is_admin,first_name,last_name,email,address,address2,city,state,zip,country,created_at,updated_at FROM users '
        )
        res.status(200).json({ users: rows })
    } catch (error) {
        console.error(error)
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await client.query(
            'SELECT id,is_admin,first_name,last_name,email,address,address2,city,state,zip,country,created_at,updated_at FROM users WHERE id = $1',
            [id]
        )
        res.status(200).json({
            user: rows[0],
        })
    } catch (error) {
        console.error(error)
    }
}
const updateUser = async (req, res) => {
    const { id } = req.params
    const { is_admin } = req.isAdmin
    const { first_name, last_name, email, address, address2, city, state, zip, country } = req.body
    if (!id) return res.status(400).json({ message: 'User ID is required' })
    if (is_admin) {
        try {
            const { rows } = await client.query(
                'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, address2 = $5, city = $6, state = $7, zip = $8, country = $9, is_admin = $10 WHERE id = $11 RETURNING *',
                [first_name, last_name, email, address, address2, city, state, zip, country, is_admin, id]
            )
            res.json({
                message: 'User updated by admin',
                user: rows[0],
            })
        } catch (error) {
            console.error(error)
        }
    }
    try {
        const { rows } = await client.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, address2 = $5, city = $6, state = $7, zip = $8, country = $9, WHERE id = $11 RETURNING *',
            [first_name, last_name, email, address, address2, city, state, zip, country, id]
        )
        res.json({
            message: 'Update successfully',
            user: rows[0],
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const { rows } = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id])
        res.json({
            message: 'User deleted',
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}
