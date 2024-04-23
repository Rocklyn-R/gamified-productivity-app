const { createUser } = require('../models/user');
const passport = require('../config/passport');

const createUserController = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const newUser = await createUser(first_name, last_name, email, password);
        req.login(newUser, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ message: 'Failed to log in user' })
            } else {
                console.log(`IT WORKS ${newUser}`)
            }
        })
        res.redirect('/tasks');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error: error.message});
    }
}

const logInUser = (req, res, next) => {
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
}

/*const redirectLoginSignUpIfAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/tasks');
    }
    else return res.status(200).send();
}*/


module.exports = { createUserController, logInUser };