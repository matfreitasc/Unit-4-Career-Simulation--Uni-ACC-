require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const verifyJWT = require('./src/middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000

// Cross Origin Resource Sharing
app.use(cors(corsOptions))

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }))
// Middleware to parse JSON
app.use(express.json())
// Middleware to parse cookies
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/products', require('./src/routes/products'))

app.use(verifyJWT)
app.use('/api/orders', require('./src/routes/orders'))
app.use('/api/cart', require('./src/routes/cart'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
        return
    }
})

const init = async () => {
    const client = require('./src/config/client')
    await client.connect()
    console.log('Connected to database')

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`)
    })
}

init()
