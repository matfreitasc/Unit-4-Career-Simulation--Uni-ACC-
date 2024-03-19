const express = require('express')
const router = express.Router()

const productsController = require('../controllers/productsController')
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require('../middleware/verifyAdmin')

router.route('/').get(productsController.getAllProducts).post(verifyAdmin, productsController.createProduct)

router
    .route('/:id')
    .get(verifyAdmin, productsController.getProductById)
    .put(verifyJWT, verifyAdmin, productsController.updateProduct)
    .delete(verifyJWT, verifyAdmin, productsController.deleteProduct)

module.exports = router
