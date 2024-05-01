const express = require('express');
const passport = require('passport');
const { checkAuthenticated, checkAuthenticatedOnLoginSignup } = require('../middleware/authentication');

const loginRouter = express.Router();
const successLoginUrl = "http://localhost:3000/tasks";
const errorLoginUrl = "http://localhost:3000/login";

loginRouter.get('/', checkAuthenticatedOnLoginSignup, (req, res) => {
  return res.status(200).json({ message: 'User signed in'});
});

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  return res.status(200).send();
});

loginRouter.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginRouter.get('/google-redirect', passport.authenticate('google', {
  failureMessage: "Cannot login to Google, please try again later!",
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl
}))


loginRouter.get('/auth/failure', (req, res) => {
  res.send("Something went wrong")
})

module.exports = loginRouter;