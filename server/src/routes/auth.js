const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

/**
 * @api {post} /api/auth/register
 * @apiName Register
 * @apiGroup Auth
 * @apiDescription Register a new user
 * @apiBody {String} email
 * @apiBody {String} password
 * @apiSuccess {String} message
 */
router.post('/register', authController.register)

router.get('/refresh', authController.refreshToken)

router.post('/login', authController.login)

router.post('/logout', authController.logout)

module.exports = router
