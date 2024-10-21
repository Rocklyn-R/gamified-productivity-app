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



loginRouter.post('/', (req, res, next) => {
  console.log('Login request received'); // Log entry
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return next(err); // Handle any errors
    }
    if (!user) {
      return res.redirect('/api/login/failure'); // Handle failure
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err); // Log error
        return next(err);
      }
      // Now you can redirect to success route
      return res.redirect('/api/login/success'); // Redirect on success
    });
  })(req, res, next);
});

loginRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginRouter.get('/google-redirect', passport.authenticate('google', {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl
}))

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