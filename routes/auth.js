const router = require('express').Router()
const passport = require('passport')

router.get('/', async (req, res) => {
    res.send('<h1>Hello World</h1>')
})

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile')
})

router.get('/profile', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.redirect('/google');
    }
});


module.exports = router