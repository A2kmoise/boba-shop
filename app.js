const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/Boba-auth-db';  
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/boba', (req, res) => res.render('boba'));
app.use(authRoutes)

//cookies

app.get('/set-cookies', (req, res) => {
 // res.setHeader('set-Cookie', 'newuser=true')

 res.cookie('newUser', false)
 res.cookie('isEmployee', true, { maxAge : 1000 * 60 * 60 * 24 , httpOnly : true})

  res.send('you got some cookies')

})

app.get('/read-cookies', (req , res) => {

  const cookies = req.cookies
  console.log( cookies.newUser )

  res.json(cookies)
})
