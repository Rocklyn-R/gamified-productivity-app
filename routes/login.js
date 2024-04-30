const express = require('express');
const passport = require('passport');
const { checkAuthenticated } = require('../middleware/authentication');

const loginRouter = express.Router();


loginRouter.get('/', checkAuthenticated, (req, res) => {
  return res.status(200).send();
});

loginRouter.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
}), (req, res) => {
  return res.status(200).send();
});



module.exports = loginRouter;