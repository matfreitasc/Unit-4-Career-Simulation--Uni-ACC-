const client = require('../config/client')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const createUserHandler = async (first_name, last_name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const { rows } = await client.query(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, email, hashedPassword]
        )
        return rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

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
        const { rows } = await client.query('SELECT * FROM users WHERE refresh_token = $1', [token])
        return rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const updateRefreshToken = async ({ id, token }) => {
    try {
        const { rows } = await client.query('UPDATE users SET refresh_token = $1 WHERE id = $2 RETURNING *', [
            token,
            id,
        ])
        return rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const getUserCart = async (id) => {
    try {
        // we will also get the cartItems belonging to the cart and user with the id
        const { rows } = await client.query(`SELECT * FROM carts WHERE user_id = $1 AND is_active = true`, [id])
        return rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const createUserCart = async (id) => {
    try {
        const { rows } = await client.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [id])
        return rows[0]
    } catch (e) {
        throw new Error(e)
    }
}

const updateCartService = async (cartId, productId, quantity) => {
    if (quantity === 0) {
        try {
            const { rows } = await client.query('DELETE FROM cartItems WHERE cart_id = $1 AND product_id = $2', [
                cartId,
                productId,
            ])
            return rows
        } catch (error) {
            throw new Error(error)
        }
    }
    try {
        const { rows } = await client.query(
            'INSERT INTO cartItems (cart_id, product_id, quantity) VALUES ($1, $2, $3) ON CONFLICT ON CONSTRAINT cart_id_product_id DO UPDATE SET quantity = $3 RETURNING *',
            [cartId, productId, quantity]
        )
        return rows
    } catch (error) {
        throw new Error(error)
    }
}

const getCartItemsByCartId = async (cartId) => {
    try {
        const { rows } = await client.query(
            'SELECT cartItems.cart_id, cartItems.product_id, cartItems.quantity, product.name, product.price, product.image_url FROM cartItems JOIN product ON cartItems.product_id = product.id WHERE cartItems.cart_id = $1',
            [cartId]
        )
        return rows
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getUserCart,
    createUserHandler,
    createUserCart,
    getCartItemsByCartId,
    updateCartService,
    findUserByEmail,
    findByToken,
    updateRefreshToken,
}
