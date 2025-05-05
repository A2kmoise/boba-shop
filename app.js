const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const user = require('./models/user');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// Session setup 
app.use(session({
  secret: '2k2kdev secret',   
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// View engine
app.set('view engine', 'ejs');

// Database connection
const dbURI = 'mongodb://127.0.0.1:27017/Boba-auth-db';  
mongoose.connect(dbURI)
  .then((result) => app.listen(3000, () => {
  }))
  .catch((err) => console.log(err));

  app.use(require('./middleware/authMiddleware').checkUser);


// Routes

app.get( checkUser); 

// Home route
app.get('/', (req, res) => res.render('home'));
app.get('/boba', requireAuth, (req, res) => res.render('boba'));
app.use(authRoutes);

