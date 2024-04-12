const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')

router.route('/').get(cartController.createCartHandler)

router.route('/').post(cartController.updateCartHandler)
router.route('/:id').delete(cartController.deleteCartHandler)

module.exports = router
