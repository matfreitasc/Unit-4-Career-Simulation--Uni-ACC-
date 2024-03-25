const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(productsController.getAllProducts).post(verifyJWT, productsController.createProduct)

router
    .route('/:id')
    .get(productsController.getProductById)
    .put(verifyJWT, productsController.updateProduct)
    .delete(verifyJWT, productsController.deleteProduct)

module.exports = router
