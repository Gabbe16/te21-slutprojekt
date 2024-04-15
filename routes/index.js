const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

const pool = require('../db')

router.get('/', function (req, res) {
    res.render('index.njk', {
        title: 'Game reviews',
        username: req.session.username
    })
})

router.post('/login', async function (req, res) {
    const username = req.body.username

    const [user] = await pool.promise().query(
        'SELECT id, password FROM gabriel_login WHERE username = ?', [username]
    )

    const passwordenter = req.body.password

    bcrypt.compare(passwordenter, user[0].password, function (err, result) {
        console.log(result)
        if (result) {
            req.session.userid = user[0].id
            req.session.username = username
            req.session.login = true
            res.redirect('/minasidor')
            console.log(req.session)
        } else {
            console.log(err)
            res.json({ message: 'Fel lösenord' })
        }
    });
})

router.get('/login', function (req, res) {
    res.render('login.njk', {
        username: req.session.username
    })
})

router.post('/signup', async function (req, res) {
    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, 10, async function (err, hash) {
        try {
            const [user] = await pool.promise().query('INSERT INTO `gabriel_login` ( `username`, `password`) VALUES( ?, ?)', [username, hash])
            res.redirect('/login')
        } catch (error) {
            console.log(error)
            res.status(402)
        }
    })
})

router.get('/signup', function (req, res) {
    res.render('signup.njk', {
        username: req.session.username
    })
})

router.get('/minasidor', function (req, res) {
    console.log(req.session)
    if (req.session.login) {
        res.render('minasidor.njk', {
            username: req.session.username,
            message: 'Välkommen'
        })
    } else {
        res.redirect('/login')
    }
})

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})

/*

router.get('/hashTest', async function (req, res) {
    bcrypt.hash('hashtest123', 10, function (err, hash) {
        console.log(hash)
        return res.json(hash);
    })
})

*/

module.exports = router