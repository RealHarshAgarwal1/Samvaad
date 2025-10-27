const mongoose = require("mongoose");
const {sendMail} = require("../utils/mail")

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

const otpSendMail = (otp,email)=>{
  sendMail(email,"Samvaad Verification OTP",`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samvaad OTP Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
        <tr>
            <td align="center" style="padding: 20px 0;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    
                    <tr>
                        <td align="center" style="background-color: #1a73e8; padding: 20px 0; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Samvaad</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #333333; font-size: 24px; margin-top: 0;">Verify Your Email Address</h2>
                            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                Thank you for joining Samvaad! Please use the following One-Time Password (OTP) to complete your verification process.
                            </p>

                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background-color: #e6f0ff; border: 1px solid #c2e0ff; border-radius: 4px; padding: 15px 30px; display: inline-block;">
                                            <p style="font-size: 36px; font-weight: bold; color: #1a73e8; letter-spacing: 5px; margin: 0;">
                                                ${otp}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #cc0000; font-size: 14px; font-weight: bold; text-align: center; background-color: #fff0f0; padding: 10px; border-radius: 4px;">
                                This code will expire in 5 minutes.
                            </p>

                            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
                                If you did not request this verification, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" style="background-color: #f9f9f9; padding: 20px 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border-top: 1px solid #eeeeee;">
                            <p style="color: #777777; font-size: 12px; margin: 0;">
                                &copy; 2025 Samvaad. All rights reserved.
                            </p>
                            <p style="color: #777777; font-size: 12px; margin: 5px 0 0 0;">
                                A company founded by **Harsh Agarwal**.
                            </p>
                        </td>
                    </tr>
                </table>
                </td>
        </tr>
    </table>

</body>
</html>`)
}

OtpSchema.pre("save",async function(next){
  await otpSendMail(this.otp,this.email);
  next()
})


module.exports = mongoose.model("OTP",OtpSchema)