const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const {localAuthenticateUser, localOptions, googleAuthenticateUser} = require('./config/passport.js');
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const initializePassport = require('./config/passport');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const { checkAuthenticatedOnLoginSignup } = require('./middleware/authentication.js');

const app = express();
const PORT = process.env.PORT || 4000;

const COOKIE_SECRET = process.env.COOKIE_SECRET


app.set('trust proxy', 1);
app.use(express.static(__dirname));
app.use(cors({
    origin: ['http://localhost:3000', 'https://accounts.google.com', 'https://task-master-rocklyn.onrender.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initializePassport(passport);


const signUpRouter = require('./routes/signup');
const tasksRouter = require('./routes/tasks');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const coinsRouter = require('./routes/coins');
const shopRouter = require('./routes/shop');
const inventoryRouter = require('./routes/inventory');
const pomodoroRouter = require('./routes/pomodoro');


app.use('/api/signup', signUpRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/profile', profileRouter);
app.use('/api/coins', coinsRouter);
app.use('/api/shop-rewards', shopRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/pomodoro', pomodoroRouter);

app.get('/api/auth', checkAuthenticatedOnLoginSignup, (req, res) => {
    return res.status(200).json({ message: 'User is authorized'});
  });


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});