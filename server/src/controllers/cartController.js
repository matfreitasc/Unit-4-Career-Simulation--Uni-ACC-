const client = require('../config/client')
const jwt = require('jsonwebtoken')
const { getUserCart, createUserCart, updateCartService, getCartItemsByCartId } = require('../utils/queries')

const createCartHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization
    try {
        // if no user_id is provided, create a cart with a session id
        if (!authHeader) {
            // create sessionsId
            return res.status(401).json({ message: 'Unauthorized, no headers were provided' })
        }
        // if the header is provided than we will decode the token and get the user id from it to prevent malicious requests

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!decoded) return res.status(401).json({ message: 'Unauthorized' })

        const userCart = await getUserCart(decoded.id)
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

        const cart = await createUserCart(decoded.id)
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
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' })
    try {
        // This function will either add a product to the cart or update the quantity of a product in the cart if it already exists
        if (!req.body.product_id) return res.status(400).json({ message: 'No product id provided' })
        if (!req.body.quantity)
            return res.status(400).json({ message: 'No quantity provided, quantity must be at least 0' })

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' })

        // get the cart of the user
        const userCart = await getUserCart(decoded.id)
        // if (userCart && !userCart.length) return res.status(404).json({ message: 'Cart not found' })
        console.log('userCart', userCart)
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
        if (!req.params.id) return res.status(400).json({ message: 'No cart id provided' })
        const getUserCart = await getUserCart(req.userId)

        if (!getUserCart.rows.length) return res.status(404).json({ message: 'Cart not found' })

        if (getUserCart.rows[0].user_id !== req.userId) return res.status(401).json({ message: 'Unauthorized' })

        const { rows } = await client.query('UPDATE carts.is_active == false WHERE carts.id = $1', [
            getUserCart.rows[0].id,
        ])
        res.json(rows)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createCartHandler,
    updateCartHandler,
    deleteCartHandler,
}
