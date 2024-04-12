const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')

router.route('/').get(cartController.createCartHandler)

router.route('/:id').post(cartController.updateCartHandler).delete(cartController.deleteCartHandler)

module.exports = router
