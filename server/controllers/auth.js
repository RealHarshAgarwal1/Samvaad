const OTP = require("../models/otp");
const User = require("../models/user");
const otpgenerator = require('otp-generator');

exports.otpSave = async(req,res)=>{
  try {
    // fetch email
    const {email} = req.body;
    if(!email){
      return res.status(400).json({
        success: false,
        message: "Email not found"
      })
    }
    
    // Check if user already exists
    const userExist = await User.findOne({email:email});

    if(userExist){
        return res.status(400).json({
          success: false,
          message: "User already exists"
        })
    } 

    const otp = otpgenerator.generate(4,{
      lowerCaseAlphabets:false,
      upperCaseAlphabets:false,
      specialChars:false
    })
    
    //create entry in DB
    const newOtp = await OTP.create({
      otp:otp,
      email:email
    });
    
    // return response
    return res.status(200).json({
      success:true,
      message:"OTP is sent in your Email",
      newOTP:newOtp
    })

  } catch (error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
    
  }
}
















