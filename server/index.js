require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const verifyJWT = require('./src/middleware/verifyJWT')
const client = require('./src/config/client')
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

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', require('./src/routes/products'))
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/cart', require('./src/routes/cart'))

app.use(verifyJWT)
app.use('/api/users', require('./src/routes/users'))

app.all('*', (req, res) => {
    return res.status(404).json({ error: '404 Not Found' })
})

const init = async () => {
    await client.connect()
    console.log('Connected to database')

    if (process.env.NODE_ENV === 'test')
        return new Promise((resolve) => {
            const testServer = app.listen(0, () => {
                console.log('Test server is running on port', testServer.address().port)
                resolve(testServer)
            })
        })

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`)
    })
}

if (process.env.NODE_ENV !== 'test') {
    init()
}

module.exports = { app, client, init }
