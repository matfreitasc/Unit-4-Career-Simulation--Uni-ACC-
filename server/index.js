require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions')
const PORT = process.env.PORT || 3000

// Cross Origin Resource Sharing
// app.use(cors(corsOptions))

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }))
// Middleware to parse JSON
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', require('./src/routes/products'))
app.use('/api/users', require('./src/routes/users'))
app.use('/api/orders', require('./src/routes/orders'))
app.use('/api/auth', require('./src/routes/auth'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
        return
    }
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
