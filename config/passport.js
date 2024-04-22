const passport = require('passport');
const { serializeUser, deserializeUser, use } = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail } = require('../models/user');

const options = {
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password', // Field name for the password
    passReqToCallback: false // Don't pass request object to verify callback
  };

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const user = findUserById(id);
        done(null, user); // Pass the retrieved user object to the callback
    } catch (error) {
        done(error); // Pass any errors to the callback
    }
});

passport.use(
    new LocalStrategy(options, async (username, password, done) => {
        try {
            const user = await findUserByEmail(username);
            if (!user || user.password !== password) {
                return done(null, false, { message: 'Incorrect email or password'});
            }
            console.log('Success')
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    })
);

module.exports = passport;