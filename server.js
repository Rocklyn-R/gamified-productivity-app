const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('express-session').MemoryStore;
const cors = require('cors');
const passport = require('./config/passport.js');

const app = express();
const PORT = process.env.PORT || 4000;

app.set('trust proxy', 1);
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

const signUpRouter = require('./routes/signup');
const tasksRouter = require('./routes/tasks');
app.use('/signup', signUpRouter);
app.use('/tasks', tasksRouter);


app.use(session({
    secret: "f4z4gs$Gcg",
    cookie: { maxAge: 300000000, secure: true, sameSite: "none" },
    saveUninitialized: false,
    resave: false,
    store: new MemoryStore(),
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});