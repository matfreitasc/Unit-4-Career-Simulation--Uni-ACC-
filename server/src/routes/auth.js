const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

router.post('/signup', authController.register)

router.post('/login', authController.login)

module.exports = router


// write me a script to use in the zsh terminal to rename all the files in the current directory from file name.js to filenameController.js
// automate the file renaming process using the terminal and the mv command in zsh
// Solution:
// for file in *; do mv "$file" "${file/ /Controller}"; done
