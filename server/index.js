require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
// Postgres Database
const pg = require('pg')

const PORT = process.env.PORT || 3000

const client = new pg.Client(process.env.DATABASE_URL)

/**
 * Serve static files
 * @api public
 */

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
