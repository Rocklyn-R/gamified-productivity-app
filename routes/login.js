const express = require('express');
const passport = require('passport');
const { logInUser } = require('../controllers/user');
const { ensureAuthenticatedOnLoginSignup } = require('../middleware/authentication');

const loginRouter = express.Router();


loginRouter.get('/', ensureAuthenticatedOnLoginSignup, (req, res) => {
  return res.status(200).send();
});

loginRouter.post('/', passport.authenticate('local', {
  successRedirect: '/tasks',
  failureRedirect: '/login',
}), (req, res) => {
  console.log(req.session); // Log the session object
});

module.exports = loginRouter;