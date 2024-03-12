const express = require('express')
const router = express.Router()

const usersController = require('../controllers/usersControler')

router.route('/').get(usersController.getAllUsers).post(usersController.createUser)

router.route('/:id').get(usersController.getUserById).put(usersController.updateUser).delete(usersController.deleteUser)

module.exports = router
