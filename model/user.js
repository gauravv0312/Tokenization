const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema  = new mongoose.Schema({
     name:{
        type: String,
        required: [true,'Please provide name'],
        maxlength:[40,'name should be under 40 character'],
     },
     email:{
        type:String,
        required:[true,'please provide email'],
        unique: true,
     },
     phoneNumber:{
        type:String,
        require:[true,'please write your phoneNumber'],
     },
     password:{
        type:String,
        require:[true,'please provide the password'],
        minlength:[6,'password should be atleast 6 characters'],
     },

});

userSchema.methods.getJwtToken = function(){
   return jwt.sign({id: this._id},process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRY
   });
};

module.exports = mongoose.model('user',userSchema);