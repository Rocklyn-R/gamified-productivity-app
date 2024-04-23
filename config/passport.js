const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail, findUserById } = require('../models/user');

const options = {
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password', // Field name for the password
    passReqToCallback: false // Don't pass request object to verify callback
  };

function initialize (passport) {
    const authenticateUser = async (username, password, done) => {
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
    }
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( async (id, done) => {
        console.log('DESERIALIZE USER called with id:', id);
        try {
            const user = await findUserById(id);
            console.log(user);
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