const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const initializePassport = require('./config/passport.js');
const flash = require('express-flash');
const { findUserByEmail, findUserById } = require('./models/user');


initializePassport(passport);
const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1);
app.use(express.static(__dirname));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: '1343aser12',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.authenticate('session'));
app.use(flash());

const options = {
    usernameField: 'email', 
    passwordField: 'password'
};

const signUpRouter = require('./routes/signup');
const tasksRouter = require('./routes/tasks');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');

app.use('/signup', signUpRouter);
app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});