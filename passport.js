const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('./schemas/user')
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/google/callback',
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                    });
                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => done(null, user))
        .catch((error) => done(error))
});
