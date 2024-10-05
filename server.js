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


app.set('trust proxy', 1);
app.use(express.static(__dirname));
// CORS Configuration
const corsOptions = {
    origin: [
        'http://localhost:3000', // Allow local development
        'https://accounts.google.com', // Google OAuth
        'https://task-master-rocklyn.onrender.com' // Your production frontend
    ],
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
};

// Apply CORS middleware before your routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors()); // This will respond to preflight requests for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors()); 

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