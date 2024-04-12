const client = require('../config/client')
const jwt = require('jsonwebtoken')
const {
    getUserCart,
    createUserCart,
    getCartItemsByCartId,
    updateCartService,
    getCartBySessionId,
} = require('../utils/queries')

const createCartHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log('authHeader', authHeader)
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
        if (userCart.length) {
            const cartItems = await getCartItemsByCartId(userCart[0].id)
            return res.status(200).json({ cart: userCart[0], cartItems })
        }
        return res.status(201).json(await createUserCart(decoded.id))
    } catch (error) {
        console.error(error)
    }
}

const updateCartHandler = async (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' })
    try {
        // This function will either add a product to the cart or update the quantity of a product in the cart if it already exists
        if (!req.params.id) return res.status(400).json({ message: 'No cart id provided' })
        if (!req.body.product_id) return res.status(400).json({ message: 'No product id provided' })

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(401).json({ message: 'Unauthorized' })

        // if the user is not logged in, we will use the session id to get the cart and update it

        // get the cart of the user
        const getUserCart = await getUserCart(req.userId)

        if (!getUserCart.rows.length) return res.status(404).json({ message: 'Cart not found' })

        if (getUserCart.rows[0].user_id !== req.userId) return res.status(401).json({ message: 'Unauthorized' })

        const updatedCart = await updateCartService(req.body.cart_id, req.body.product_id, req.body.quantity)

        res.json({ cart, updatedCart })
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

        const { rows } = await client.query('DELETE FROM cart WHERE id = $1 RETURNING *', [getUserCart.rows[0].id])
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
