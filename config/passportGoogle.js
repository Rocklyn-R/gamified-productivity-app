const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const { findByGoogleIdOrCreate } = require('../models/user');

const GOOGLE_CLIENT_ID = '81958654526-j2qrbn28r9f65ifc9rg8pfcdvfg0551e.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const callbackURL = process.env.NODE_ENV === 'production' 
    ? 'https://task-master-rocklyn.onrender.com/api/login/google-redirect' 
    : 'http://localhost:4000/api/login/google-redirect';

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  }))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        done(null, user); // Pass the retrieved user object to the callback
    } catch (error) {
        done(error); // Pass any errors to the callback
    }
})