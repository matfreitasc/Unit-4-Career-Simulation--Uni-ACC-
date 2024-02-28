const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/ordersController')

router
    .route('/')
    .get(ordersController.getAllOrders)
    .post(ordersController.createOrder)

router
    .route('/:id')
    .get(ordersController.getOrderById)
    .put(ordersController.updateOrder)
    .delete(ordersController.deleteOrder)

module.exports = router
