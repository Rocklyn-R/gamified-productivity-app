const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const {localAuthenticateUser, localOptions, googleAuthenticateUser} = require('./config/passport.js');
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const initializePassport = require('./config/passport');
require('dotenv').config();
const { checkAuthenticatedOnLoginSignup } = require('./middleware/authentication.js');

const app = express();
const PORT = process.env.PORT || 4000;

const COOKIE_SECRET = process.env.COOKIE_SECRET


app.set('trust proxy', 1);
app.use(express.static(__dirname));
app.use(cors({
    origin: ['http://localhost:3000', 'https://accounts.google.com'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true  // Required for newer versions of Redis
});
redisClient.connect().catch(console.error);

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: COOKIE_SECRET,  // You should store this in an environment variable
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,  // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24  // 1 day
    }
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


app.use('/signup', signUpRouter);
app.use('/tasks', tasksRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/profile', profileRouter);
app.use('/coins', coinsRouter);
app.use('/shop-rewards', shopRouter);
app.use('/inventory', inventoryRouter);
app.use('/pomodoro', pomodoroRouter);

app.get('/auth', checkAuthenticatedOnLoginSignup, (req, res) => {
    return res.status(200).json({ message: 'User is authorized'});
  });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});