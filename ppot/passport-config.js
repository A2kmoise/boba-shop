const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); 


passport.use(new LocalStrategy({
  usernameField: 'email', 
}, (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
     
      if (user.password === password) {  
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }
    })
    .catch(err => done(err));
}));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});
