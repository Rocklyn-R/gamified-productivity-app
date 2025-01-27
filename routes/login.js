const express = require('express');
const passport = require('passport');
const { checkAuthenticated, checkAuthenticatedOnLoginSignup } = require('../middleware/authentication');

const loginRouter = express.Router();
const successLoginUrl = process.env.NODE_ENV === 'production' 
    ? 'https://task-master-rocklyn.onrender.com/tasks' 
    : 'http://localhost:3000/tasks';
const errorLoginUrl = process.env.NODE_ENV === 'production' 
    ? 'https://task-master-rocklyn.onrender.com/login' 
    : 'http://localhost:3000/login';


loginRouter.get('/', checkAuthenticatedOnLoginSignup, (req, res) => {
  return res.status(200).json({ message: 'User signed in'});
});

/*
loginRouter.post('/', (req, res, next) => {
    console.log('Before passport authenticate');
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect('/api/login/failure');
        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log('User logged in:', req.user);
            console.log('Session after login:', req.session);
            return res.redirect('/api/login/success');
        });
    })(req, res, next);
});*/

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: '/api/login/failure'
}), (req, res) => {
  console.log('User after authentication:', req.user); // Check if req.user is populated
  console.log(req.session);
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("IS AUTHENTICATED"); // This should print
  } else {
    console.log("User is NOT authenticated"); 
    return res.status(401).send({ message: "User not authenticated" });
  }
  return res.status(200).send();
});

loginRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginRouter.get('/google-redirect', (req, res, next) => {
  console.log("Google Redirect Route Hit!");
  console.log("Query Params:", req.query); // Log the query parameters to check the URL parameters
  next();
}, passport.authenticate('google', {
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl
}), (req, res) => {
  console.log('Google login successful!');
  res.redirect(successLoginUrl);
});


loginRouter.get('/success', (req, res) => {
  console.log('After passport.authenticate');
  if (req.isAuthenticated()) {
      console.log("User authenticated:", req.user); // Log authenticated user
      return res.status(200).send({ message: "Login successful" });
  } else {
      console.log("User is NOT authenticated");
      return res.status(401).send({ message: "User not authenticated" });
  }
});

loginRouter.get('/failure', (req, res) => {
  res.status(401).json({ message: "Incorrect email or password" })
})

loginRouter.get('/auth/failure', (req, res) => {
  res.send("Something went wrong")
})

module.exports = loginRouter;