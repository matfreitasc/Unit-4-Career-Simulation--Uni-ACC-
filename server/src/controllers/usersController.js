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
    if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized, this action required admin permissions' })
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
/**
 * This will allow the user to update their own information
 * A user is not allowed to update their is_admin status
 * This route will be protected by the verifyJWT middleware
 * The userId will be available on the req object after the verifyJWT middleware runs and decodes the token and adds the user id to the req object
 */

const updateUser = async (req, res) => {
    const { first_name, last_name, email, address, address2, city, state, zip, country } = req.body
    const { id } = req.userId
    try {
        const { rows } = await client.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, address2 = $5, city = $6, state = $7, zip = $8, country = $9, WHERE id = $11 RETURNING *',
            [first_name, last_name, email, address, address2, city, state, zip, country, id]
        )
        res.status(200).json({
            message: 'Update successfully',
            user: rows[0],
        })
    } catch (error) {
        console.error(error)
    }
}
/**
 * This will allow the admin to update any user information by id
 * This route will be protected by the verifyJWT middleware
 * 
 */

const updateUserById = async (req, res) => {
    if (!req.isAdmin) return res.status(401).json({ message: 'Unauthorized, this action required admin permissions' })
    const { id, first_name, last_name, email, address, address2, city, state, zip, country, is_admin } = req.body
    try {
        const { rows } = await client.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3, address = $4, address2 = $5, city = $6, state = $7, zip = $8, country = $9, is_admin = $11, WHERE id = $12 RETURNING *',
            [first_name, last_name, email, address, address2, city, state, zip, country, is_admin, id]
        )
        res.status(200).json({
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
        res.status(200).json({
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
    updateUserById,
    deleteUser,
}
