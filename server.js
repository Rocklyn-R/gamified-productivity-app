const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const initializePassport = require('./config/passport.js');
const flash = require('express-flash');
const { findUserByEmail, findUserById } = require('./models/user');

//initializePassport(passport);
const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1);
app.use(express.static(__dirname));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());

app.use(session({
    secret: '1343aser12',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const options = {
    usernameField: 'email', 
    passwordField: 'password', 
    passReqToCallback: false
};

const authenticateUser = async (username, password, done) => {
    try {
        const user = await findUserByEmail(username);
        if (!user || user.password !== password) {
            return done(null, false, { message: 'Incorrect email or password' });
        }
        console.log('Success') 
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
};

passport.serializeUser((user, done) => {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("This is called")
        const user = await findUserById(id);
        console.log(user);
        done(null, user); 
});

passport.use(
    new LocalStrategy(options, authenticateUser)
);


const signUpRouter = require('./routes/signup');
const tasksRouter = require('./routes/tasks');
const loginRouter = require('./routes/login');
app.use('/signup', signUpRouter);
app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);

//put this middleware function before each route that's available only to logged in users
/*const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}*/

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});