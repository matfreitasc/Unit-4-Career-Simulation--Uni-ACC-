const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader)
        return res.status(401).send({
            message: 'Authorization header required',
        })
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(403).send('Forbidden ')
        req.userId = decoded.id
        if (decoded.is_admin) req.isAdmin = decoded.is_admin
        next()
    })
}

module.exports = verifyJWT
