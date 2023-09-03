const express = require('express')
const mongoose = require('mongoose')
const AuthRoutes = require('./routes/auth')
const passport = require('passport')
const passportConfig = require('./passport')
const session = require('express-session')
require('dotenv').config()
const app = express()

app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('', AuthRoutes)

app.use(express.urlencoded({ extended: true }));




function startApp() {
    mongoose.connect(process.env.MONGO_URI_LOCAL)
        .then(() => console.log('Mongo DB was connected'))
        .catch((err) => console.log(`Mongo DB did't connect 'cause ${err}`))
    const port = process.env.PORT || 8000
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}
startApp()