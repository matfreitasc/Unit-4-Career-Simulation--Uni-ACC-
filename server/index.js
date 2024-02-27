require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
// Postgres Database
const pg = require('pg')

const PORT = process.env.PORT || 3000

const client = new pg.Client(process.env.DATABASE_URL)

// Cross Origin Resource Sharing
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/products', require('./routes/products'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))




app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
