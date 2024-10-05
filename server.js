const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const { localAuthenticateUser, localOptions, googleAuthenticateUser } = require('./config/passport.js');
const flash = require('express-flash');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const initializePassport = require('./config/passport');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
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

let redisClient;


// Redis Client and Session Setup
if (process.env.NODE_ENV === 'production') {
    redisClient = redis.createClient({
        url: process.env.REDIS_URL,
        legacyMode: true,
    });

    redisClient.connect()
        .then(() => {
            console.log('Connected to Redis');

            // Set up session middleware after connecting to Redis
            app.use(session({
                store: new RedisStore({ client: redisClient }),
                secret: COOKIE_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    secure: true, // Set to true if you're using HTTPS
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24, // Example: 1 day
                },
            }));

            // Initialize Passport AFTER session middleware
            app.use(passport.initialize());
            app.use(passport.session());
            initializePassport(passport); // Initialize passport here
        })
        .catch(err => {
            console.error('Redis connection error:', err);

            // Fallback: start server without Redis sessions
            app.use(session({
                secret: COOKIE_SECRET,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24, // Example: 1 day
                },
            }));

            // Initialize Passport without Redis
            app.use(passport.initialize());
            app.use(passport.session());
            initializePassport(passport);
        });
} else {
    // Development session setup
    app.use(session({
        secret: COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // Example: 1 day
            secure: false, // Set to false in development
        },
    }));

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());
    initializePassport(passport);
}



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
    return res.status(200).json({ message: 'User is authorized' });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'view', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'view', 'build', 'index.html'));
    });
}


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});