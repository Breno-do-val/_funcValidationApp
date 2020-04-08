const port = 3000 || process.env.port

const express = require('express')
const app = express()

const path = require('path')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./routes'))

app.listen(port)