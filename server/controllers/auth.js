const OTP = require("../models/otp");
const User = require("../models/user");
const otpgenerator = require('otp-generator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


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
    const {userName,email,password,otp}=req.body;

    //validation
    if(!userName || !email || !password || !otp){
      return res.status(400).json({
        success:false,
        message:"Please fill all the fields"
      });
    }
    // Check if user already exists
    const userExists = await User.findOne({email:email});
    if(userExists){
      return res.status(400).json({
        success:false,
        message:"Email already Exists"
      })
    }

    // Finding the Latest OTP
    const latestOtp = await OTP.findOne({email:email}).sort({createdAt:-1});

    if(!latestOtp){
      return res.status(400).json({
        success:false,
        message:"OTP not found"
      });
    }

    if(latestOtp.otp !== parseInt(otp)){
      return res.status(400).json({
        success:false,
        message:"OTP is not Correct"
      });
    }

    // Securing the Password
    // Ensure password is a string before hashing (defensive)
    let passwordToHash = password;
    if (typeof passwordToHash !== 'string') {
      passwordToHash = String(passwordToHash);
    }
    const hashPassword = await bcrypt.hash(passwordToHash,10);

    // Creating the user entry in the Database (save hashed password)
    const newUser = await User.create({
      userName:userName,
      email:email,
      password:hashPassword
    });

    return res.status(200).json({
      success:true,
      message:"Account Created Succesfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    });
  }
}

// Login Setup
exports.logIn = async(req,res)=>{
  try {
    // Fetch Data from request body
    const {email,password} = req.body;

    //validation
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:"Please Fill all the input fields"
      })
    }

    // check user account exist or not
    const user = await User.findOne({email:email});

    if(!user){
      return res.status(400).json({
        success:false,
        message:"User does not exist"
      });
    }
    const payload = {
      userID: user._id,
      userName: user.userName,
      email: user.email
    };

    // Defensive: ensure both password and hash are strings
    let passwordToCompare = password;
    if (typeof passwordToCompare !== 'string') {
      passwordToCompare = String(passwordToCompare);
    }
    let hashToCompare = user.password;
    if (typeof hashToCompare !== 'string') {
      hashToCompare = String(hashToCompare);
    }

    if(await bcrypt.compare(passwordToCompare, hashToCompare)){
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d"
      });
      user.token = token;
      // Remove password from response
      const { password, ...userSafe } = user.toObject();
      userSafe.token = token;
      return res.status(200).json({
        success:true,
        message:"Login Success",
        user: userSafe
      });
    } else {
      return res.status(401).json({
        success:false,
        message:"Password does not match"
      });
    }
  } catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
    
  }
}















