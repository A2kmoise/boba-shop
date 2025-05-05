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
        minlength: [6, 'Password should have at least 6 characters'],
    }
})

// Hash password before saving
userSchema.pre('save', async function(next) {
   const salt =  await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt)
   next()
})

// Static login method
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
      const auth = await bcrypt.compare(password, user.password)
      if (auth) return user
      throw Error('incorrect password')
    } 
    throw Error('incorrect email')
}

// ✅ This line prevents OverwriteModelError
const User = mongoose.models.user || mongoose.model('user', userSchema)

module.exports = User