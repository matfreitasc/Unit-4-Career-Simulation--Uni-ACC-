const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/ordersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(ordersController.getAllOrders).post(verifyJWT, ordersController.createOrder)

router
    .route('/:id')
    .get(ordersController.getOrderById)
    .put(verifyJWT, ordersController.updateOrder)
    .delete(verifyJWT, ordersController.deleteOrder)

module.exports = router
