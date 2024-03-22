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

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', require('./src/routes/products'))
app.use('/api/auth', require('./src/routes/auth'))
app.use('/api/cart', require('./src/routes/cart'))

app.use(verifyJWT)
app.use('/api/users', require('./src/routes/users'))

app.all('*', (req, res) => {
    return res.status(404).json({ error: '404 Not Found' })
})

const test = async () => {}

const init = async () => {
    const client = require('./src/config/client')
    await client.connect()
    console.log('Connected to database')

    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}!`)
    })
}

init()
