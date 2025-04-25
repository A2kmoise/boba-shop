const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type:String,
        required: [true, 'Please enter the password'],
        minlength: [6, 'Password should have atleast 6 characters'],
    }
})

// this is to fire a function after a doc is saved to db
/*userSchema.post('save' ,  function (doc , next) {
    console.log('new user created and saved' , doc)
    next()
})
*/
// this is to fire a function before a  doc is saved to db

userSchema.pre('save' , async function(next) {
   // console.log('new user is about to be created and saved', this) 
   const salt =  await bcrypt.genSalt();
   this.password = await  bcrypt.hash(this.password, salt)
    next()
})
const user = mongoose.model('user', userSchema)

module.exports = user;