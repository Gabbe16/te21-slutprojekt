const express = require('express')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
    res.render('index.njk', { title: 'Game reviews' })
})

router.get('/login', function (req, res) {
    res.render('login.njk', {

    })
})

router.get('/signup', function (req, res) {
    res.render('signup.njk', {

    })
})




module.exports = router