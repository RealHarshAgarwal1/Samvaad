const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  otp:{
    type:Number,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expires:5*60
  }
})


module.exports = mongoose.model("OTP",OtpSchema)