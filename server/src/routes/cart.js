const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(cartController.createCartHandler)

router.route('/').post(verifyJWT, cartController.updateCartHandler)
router.route('/').delete(verifyJWT, cartController.deleteCartHandler)

module.exports = router
