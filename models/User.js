const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');



const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name'],
    minLength: 3,
    maxLength: 45,
  },
  email: {
    type: String,
    required: [true, 'please provide a valid email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'please provide a valid email',
    ],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'please provide a name'],
    minLength: 5,
  },
});


UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  
})


UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET,
  {expiresIn:process.env.JWT_LIFETIME}
  )
}

//Compare passwords
UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password)
return isMatch
}
module.exports = mongoose.model('User', UserSchema);
