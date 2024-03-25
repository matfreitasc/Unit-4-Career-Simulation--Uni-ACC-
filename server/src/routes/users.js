const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/').get(verifyJWT, usersController.getAllUsers)

router
    .route('/:id')
    .get(verifyJWT, usersController.getUserById)
    .put(verifyJWT, usersController.updateUser)
    .delete(verifyJWT, usersController.deleteUser)

module.exports = router
