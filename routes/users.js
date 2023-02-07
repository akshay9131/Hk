var mongoose = require('mongoose');
var validator = require('validator')


mongoose.connect('mongodb://localhost/hktask')

var userSchema = mongoose.Schema({
  name : String,
  email : {
    type : String,
    validate: [validator.isEmail, 'email id is not valid']
  },
  mobile : {
    type : String,
    validate : [/^(\+\d{1,3}[- ]?)?\d{10}$/, 'mobile number is not valid']
  },
})


module.exports = mongoose.model('user', userSchema)