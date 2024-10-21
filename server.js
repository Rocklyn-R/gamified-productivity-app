const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis').default; // Correct import for v7.x
const { createClient } = require('redis');
const initializePassport = require('./config/passport');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require('path');
const { checkAuthenticatedOnLoginSignup } = require('./middleware/authentication.js');
const MemoryStore = require('memorystore')(session)

const app = express();
const PORT = process.env.PORT || 4000;


const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://accounts.google.com',  // Keeping the Google origin
        'https://task-master-rocklyn.onrender.com',
    ],
    credentials: true, // Allow credentials (cookies, Authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Handle preflight requests
app.options('*', cors(corsOptions));
// Apply CORS middleware before your routes
app.use(cors(corsOptions));


app.set('trust proxy', 1);
app.use(express.static(__dirname));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const redisUrl = process.env.NODE_ENV === 'development'
    ? 'rediss://red-csb5ltogph6c73aaak60:0SR0RXoGw6haTyYewERfjKB0p1LfTPPJ@virginia-redis.render.com:6379' // Use external Redis URL in development
    : 'redis://red-csb5ltogph6c73aaak60:6379'; // Use the internal Redis URL in production

// Create a Redis client
const redisClient = createClient({
    url: redisUrl
})

// Connect to Redis
redisClient.connect().catch(err => {
    console.error('Could not connect to Redis:', err);
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
}); 


// Set up session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.COOKIE_SECRET,
    resave: false, // Set to false to prevent unnecessary saves
    saveUninitialized: false, // Set to false to prevent saving sessions that are not initialized
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  }));
  

/*
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
     store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
 }));*/






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