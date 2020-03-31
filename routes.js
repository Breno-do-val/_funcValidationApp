const express = require('express')
const routes = new express.Router()

const rhController = require('./Controllers/rhController')
const devController = require('./Controllers/devControlller')

routes.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Home'
    })
})

routes.get('/acknowledge', (req, res) => {
    res.render('acknowledge')
})

routes.get('/company', rhController.index)

routes.post('/company', rhController.store)

routes.get('/developer', devController.index)

routes.post('/developer', devController.store)

module.exports = routes