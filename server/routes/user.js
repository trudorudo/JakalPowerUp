const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: process.env.FRONTEND_URL
    }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/landing?${encodeURIComponent(req.user.name)}`)
    }
)
router.post('/', (req, res) => {
    const { name, username, password, password2 } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else if (!name || !username || !password || !password2) {
            res.json({
                error: `Please fill in all fields`
            })
        } else if (password.length < 6) {
            res.json({
                error: `Password should be at least 6 characters`
            })
        } else if (password !== password2) {
            res.json({
                error: `Passwords do not match`
            })
        }
        else {
            const newUser = new User({
                name: name,
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                delete savedUser.password;
                res.json(savedUser)
            })
        }
    })
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            res.json({ error: 'An error occurred' })
        } else if (!user || !user.checkPassword(password)) {
            res.json({ error: 'Incorrect username or password' })
        } else {
            delete user.password;
            res.json(user);
        }
    });
}
)

router.get("/user", (req, res, next) => {
    console.log("====================user===============")

    if (req.session.passport.user) {
        console.log(req.session.passport.user)
        // console.log(req.user)
        return res.json({ user: req.user })

    } else {
        return res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router