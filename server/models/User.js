const mongoose = require('mongoose')

const UserSchema =  new mongoose.Schema({
    fname : {
      type: String
    },
    lname :{
      type: String
    }, 
    username : {
      type: String
    },
    password : {
      type: String
    },
    email : {
      type: String
    },
    role : {
      type: String,
      default : 'user'
    },
    enabled : {
      type: Boolean,
      default : false,
    }
},
{timestamps : true}
)

module.exports = MyUser = mongoose.model('users', UserSchema)