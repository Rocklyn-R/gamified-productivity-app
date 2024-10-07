const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');
const initializePassport = require('./config/passport');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
const { checkAuthenticatedOnLoginSignup } = require('./middleware/authentication.js');

const app = express();
const PORT = process.env.PORT || 4000;

const COOKIE_SECRET = process.env.COOKIE_SECRET
// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://accounts.google.com',
        'https://task-master-rocklyn.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('*', cors());
// Apply CORS middleware before your routes
// CORS Middleware
app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:3000',
        'https://accounts.google.com',
        'https://task-master-rocklyn.onrender.com'
    ];

    const origin = req.headers.origin;
    
    // Check if the origin of the request is in the allowedOrigins list
    if (allowedOrigins.includes(origin)) {
        console.log('CORS: Allowing origin:', origin);
        res.header('Access-Control-Allow-Origin', origin); // Set the specific origin for the request
        res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, auth headers)
    } else {
        console.log('CORS: Origin not allowed:', origin);
    }

    // Set common headers for all requests
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'); // Allow all relevant methods
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');  // Allow these headers

    // Explicit handling for preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        console.log('CORS: Handling preflight request');
        // Preflight response for OPTIONS
        res.header('Access-Control-Max-Age', '600'); // Cache the preflight request for 10 minutes
        return res.status(200).end();
    }

    // Proceed to the next middleware or route
    next();
});

app.set('trust proxy', 1);
app.use(express.static(__dirname));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    legacyMode: true,
});

// Connect to Redis
redisClient.connect();

// Set up session middleware
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


/* // Development session setup
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

*/

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport); // Initialize passport here

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



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});