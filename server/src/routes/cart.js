const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')

router.route('/').post(cartController.createCartHandler)

router.route('/:id').post(cartController.updateCartHandler).delete(cartController.deleteCartHandler)

module.exports = router
