const client = require('../config/client')
const jwt = require('jsonwebtoken')
const { getUserCart, createUserCart, updateCartService, getCartItemsByCartId } = require('../utils/queries')

const createCartHandler = async (req, res, next) => {
    try {
        const userCart = await getUserCart(req.userId)
        if (userCart && userCart.id) {
            const cartItems = await getCartItemsByCartId(userCart.id)
            return res.status(201).json({
                message: 'User cart found',
                cart: {
                    ...userCart,
                    cartItems: cartItems,
                },
            })
        }

        const cart = await createUserCart(req.userId)
        const cartItems = await getCartItemsByCartId(cart.id)
        return res.status(201).json({
            message: 'Cart created',
            cart: {
                ...userCart,
                cartItems: cartItems,
            },
        })
    } catch (error) {
        console.error(error)
    }
}

const updateCartHandler = async (req, res) => {
    try {
        const userCart = await getUserCart(req.userId)
        await updateCartService(userCart.id, req.body.product_id, req.body.quantity)
        const cartItems = await getCartItemsByCartId(userCart.id)
        return res.status(201).json({
            message: 'Cart Updated successfully',
            cart: {
                ...userCart,
                cartItems: cartItems,
            },
        })
    } catch (error) {
        console.error(error)
    }
}

const deleteCartHandler = async (req, res) => {
    try {
        const getUserCart = await getUserCart(req.userId)
        const { rows } = await client.query('UPDATE carts.is_active == false WHERE carts.id = $1', [
            getUserCart.rows[0].id,
        ])
        return res.status(201).json({
            message: 'Cart deleted successfully',
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createCartHandler,
    updateCartHandler,
    deleteCartHandler,
}
