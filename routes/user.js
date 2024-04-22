import express from 'express';
import passport from '../config/passport';

const user = express.Router();

user.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          return res.status(500).send({ message: 'Internal Server Error' });
        }
        if (!user) {
          return res.status(401).send({ message: 'Wrong email or password. Try again.' });
        }
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).send({ message: 'Internal Server Error' });
          }
          return res.redirect('/tasks');
        });
      })(req, res, next);
})