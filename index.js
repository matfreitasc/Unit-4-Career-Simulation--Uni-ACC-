require('dotenv').config()
// Express Server
const express = require('express')
const app = express()
const path = require('path')
// Postgres Database
const pg = require('pg')

const PORT = process.env.PORT || 3001

const client = new pg.Client(process.env.DATABASE_URL)

/**
 * Serve static files
 * @api public
 */

app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})
