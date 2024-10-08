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

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: '/failure',
}), (req, res) => {
  console.log('User after authentication:', req.user); // Check if req.user is populated
  console.log(req.session);
  console.log(req.user);
  if (req.isAuthenticated()) {
    console.log("IS AUTHENTICATED"); // This should print
  } else {
    console.log("User is NOT authenticated"); // This will print if req.user is null
  }
  return res.status(200).send();
});

loginRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginRouter.get('/google-redirect', passport.authenticate('google', {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl
}))

loginRouter.get('/failure', (req, res) => {
  res.status(401).json({ message: "Incorrect email or password" })
})

loginRouter.get('/auth/failure', (req, res) => {
  res.send("Something went wrong")
})

module.exports = loginRouter;