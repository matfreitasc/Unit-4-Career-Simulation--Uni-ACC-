const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cartController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)
router.route('/').get(cartController.createCartHandler)
router.route('/').post(cartController.updateCartHandler)
router.route('/').delete(cartController.deleteCartHandler)

module.exports = router
