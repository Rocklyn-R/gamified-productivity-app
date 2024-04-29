const express = require('express');
const passport = require('passport');
const { logInUser } = require('../controllers/user');
const { checkAuthenticated } = require('../middleware/authentication');

const loginRouter = express.Router();


loginRouter.get('/', checkAuthenticated, (req, res) => {
  console.log("TRUE")
  return res.status(200).send();
});

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  res.redirect('/tasks')
});



module.exports = loginRouter;