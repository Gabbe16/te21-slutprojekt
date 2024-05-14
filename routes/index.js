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

    const passwordEntered = req.body.password

    bcrypt.compare(passwordEntered, user[0].password, function (err, result) {
        console.log(result)
        if (result) {
            req.session.userid = user[0].id
            req.session.username = username
            req.session.login = true
            res.redirect('/minasidor')
            console.log(req.session)
        } else {
            console.log(err)
            res.render('login.njk')
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

router.get('/minasidor', async function (req, res) {
    console.log(req.session)
    if (req.session.login) {
        const userID = req.session.userid
        const [reviewsWithID] = await pool.promise().query('SELECT * FROM gabriel_reviews WHERE user_id = ?', [userID])
        res.render('minasidor.njk', {
            title: 'Dina recensioner',
            username: req.session.username,
            reviewsWithID: reviewsWithID,
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

router.get('/reviews', async function (req, res) {
    try {
        const id = req.params.id
        const [reviews] = await pool.promise().query(`SELECT gabriel_reviews.*, gabriel_games.name AS game FROM gabriel_reviews JOIN gabriel_games ON gabriel_reviews.game_id = gabriel_games.id;`)
        console.log(reviews)
        res.render('reviews.njk', {
            title: 'Alla spelrecensioner',
            reviews: reviews,
            username: req.session.username,
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/reviews/new', async function (req, res) {
    if (req.session.login) {
        try {
            const [games] = await pool.promise().query('SELECT * FROM gabriel_games')
            return res.render('newreview.njk', {
                title: 'Ny review',
                games: games,
                username: req.session.username,
            })
        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    } else {
        res.redirect('/login')
    }
})

router.get('/reviews/:id/delete', async function (req, res) {
    try {
        const [result] = await pool.promise().query(
            `DELETE FROM gabriel_reviews WHERE id = ?`,
            [req.params.id]
        )
        res.redirect('/minasidor')
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.get('/reviews/:id', async function (req, res) {
    try {
        const [reviewWithGame] = await pool.promise().query(
            `SELECT gabriel_reviews.*, gabriel_games.name as game, gabriel_games.description, gabriel_login.username
            FROM gabriel_reviews
            JOIN gabriel_games
            ON gabriel_reviews.game_id = gabriel_games.id
            JOIN gabriel_login 
            ON gabriel_reviews.user_id = gabriel_login.id
            WHERE gabriel_reviews.id = ?`, [req.params.id]
        );
        return res.render('review.njk', {
            title: 'Spel',
            review: reviewWithGame[0],
            username: req.session.username,
            user: reviewWithGame[0].username
        })
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/reviews', async function (req, res) {
    try {
        const [result] = await pool.promise().query(
            `INSERT INTO gabriel_reviews (title, text, score, game_id, user_id)
        VALUES (?, ?, ?, ?, ?)`,
            [req.body.title, req.body.text, req.body.score, req.body.game, req.session.userid]
        )
        res.redirect('/reviews')
    } catch (error) {
        console.log(error)
        res.redirect('/reviews')
    }
})

module.exports = router