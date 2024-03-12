const client = require('../config/client')

const findUserByEmail = async (email) => {
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email])
        return result.rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const findByToken = async (token) => {
    try {
        const result = await client.query('SELECT * FROM users WHERE refresh_token = $1', [token])
        console.log('result', result.rows[0])
        return result.rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const updateRefreshToken = async ({ id, token }) => {
    try {
        const result = await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *', [token, id])
        return result.rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = {
    findUserByEmail,
    findByToken,
    updateRefreshToken,
}
