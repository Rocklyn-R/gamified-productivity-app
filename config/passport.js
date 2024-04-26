const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail, findUserById } = require('../models/user');
const bcrypt = require('bcrypt');


const options = {
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password', // Field name for the password
    passReqToCallback: false // Don't pass request object to verify callback
  };

function initialize (passport) {
    const authenticateUser = async (username, password, done) => {
        try {
            const user = await findUserByEmail(username);
            const matchedPassword = await bcrypt.compare(password, user.password);
            if (!user || !matchedPassword) {
                return done(null, false, { message: 'Incorrect email or password'});
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( async (id, done) => {
        try {
            const user = await findUserById(id);
            done(null, user); // Pass the retrieved user object to the callback
        } catch (error) {
            done(error); // Pass any errors to the callback
        }
    });
    passport.use(
        new LocalStrategy(options, authenticateUser)
    )
}



module.exports = initialize;