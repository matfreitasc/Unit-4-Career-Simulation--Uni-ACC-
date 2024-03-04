const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(verifyJWT, cartController.getAllCarts).post(verifyJWT, cartController.createCart)

router
    .route('/:id')
    .get(verifyJWT, cartController.getCartById)
    .put(verifyJWT, cartController.updateCart)
    .delete(verifyJWT, cartController.deleteCart)

module.exports = router
