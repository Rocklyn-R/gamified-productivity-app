const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail, findUserById } = require('../models/user');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { findByGoogleIdOrCreate } = require('../models/user');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET


const localOptions = {
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password', // Field name for the password
    passReqToCallback: false // Don't pass request object to verify callback
};

const callbackURL = process.env.NODE_ENV === 'production' 
    ? 'https://task-master-backend-m9mq.onrender.com/api/login/google-redirect' 
    : 'http://localhost:4000/api/login/google-redirect';

const googleOptions = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
}

const localAuthenticateUser = async (username, password, done) => {
    console.log('Authenticating user:', username); // Log the username being attempted
    try {
        const user = await findUserByEmail(username);
        if (!user || !user.password) {
            console.log('User not found or no password'); // Log reason for failure
            return done(null, false, { message: 'Incorrect email or password' });
        }
        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
            console.log('Password does not match'); // Log reason for failure
            return done(null, false, { message: 'Incorrect email or password' });
        }
        console.log('User authenticated successfully:', user);
        return done(null, user);
    } catch (error) {
        console.error('Error during authentication:', error); // Log any errors
        return done(error);
    }
};

const googleAuthenticateUser = async (request, accessToken, refreshToken, profile, done) => {
    try {
        console.log("GOOGLE AUTHENTICATING");
        console.log("Profile received from Google:", profile);
        const user = await findByGoogleIdOrCreate(profile);
        console.log("User found or created:", user);
        return done(null, user);
    } catch (error) {
        console.error("Error during Google authentication:", error);
        return done(error);
    }
}

passport.serializeUser((user, done) => {
    const userId = user.id;
    done(null, userId);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserById(id);
        if (user) {
            // Optionally, remove the password field from the user object
            const { password, ...safeUser } = user;
            done(null, safeUser); // Pass the user without the password
        } else {
            done(null, false)
        }

    } catch (error) {
        console.error('Error during deserialization:', error); 
        done(error); // Pass any errors to the callback
    }
});

const initializePassport = (passport) => {
    passport.use(new LocalStrategy(localAuthenticateUser));
    passport.use(new GoogleStrategy(googleOptions, googleAuthenticateUser));
}


module.exports = initializePassport;