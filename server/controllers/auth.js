const OTP = require("../models/otp");
const User = require("../models/user");
const otpgenerator = require('otp-generator');
const bcrypt = require("bcrypt");


//send otp to the user's mail and in database with pre method
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


// Singup

exports.signUp = async(req,res)=>{
  try {
    // Fetch Data
    const {userName,email,password}=req.body;

    //validation
    if(!userName || !email || !password || !otp){
      return res.status(400).json({
        success:false,
        message:"Please fill all the fields"
      })
    }
    // Check if user already exists
    const userExists = await User.findOne({email:email});
    if(userExists){
      return res.status(400).json({
        success:false,
        message:"Email already Exists"
      })
    }

    const latestOtp = await OTP.findOne({email:email}).sort({createdAt:-1})

    if(!latestOtp){
      return req.status(400).json({
        success:false,
        message:"OTP not found"
      })
    }
    if(latestOtp != otp){
      return res.status(400).json({
        success:false,
        message:"OTP is not Correct"
      })
    }
    const hashPassword = await bcrypt.hash(password,10);

  } catch (error) {
    
  }
}















