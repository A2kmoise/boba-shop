const User = require('../models/user')
const jwt = require('jsonwebtoken')

//error handling
const handleError = (err) => {
    console.log(err.message, err.code)
    let errors = { email:'', password:''}

//email errors
if (err.message === 'incorrect email') {
  errors.email = 'This email is not registered'
}

//password error
if (err.message === 'incorrect password') {
  errors.password = 'This password is incorrect'
}

 //duplicate errors
 if (err.code === 11000) {
    errors.email = 'this email is already registered'
    return errors 
 }

 // validation errors
 if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return(errors)
}

const maxAge = 3 * 24 * 60 * 60 
const createTokens = ( id ) => {
  return jwt.sign( { id }, '2k2kdev secret', {
    expiresIn: maxAge
  })
  
}

module.exports.signup_get = (req , res) => {
    res.render('signup');
}

module.exports.login_get = (req , res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.create({ email, password });
      const token = createTokens( User._id )
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(201).json( { user : user._id } );
    }
    catch(err) {
      const errors = handleError(err);
      res.status(400).json({ errors });
    } 
  }

module.exports.login_post = async (req ,res) => {
    const { email, password} = req.body
   
    try {
      const user = await User.login(email, password)
      const token = createTokens( User._id )
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json( { user: user._id } )

    } catch (err) {
      const errors = handleError(err)
      res.status(400).json( { errors } )

    }
   
}

module.exports.logout_get = ( req ,res) => {
  res.cookie('jwt', '', {maxAge:1});
  res.redirect('/');
}
module.exports.notfound = ( req, res) => {
  res.render('notfound');
}