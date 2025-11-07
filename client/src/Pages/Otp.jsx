import React from 'react'
import OTPInput from 'react-otp-input'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Otp = () => {
  const location = useLocation();
  const signUpData = location.state.signUpData;
  const [otp,setOtp] = useState("");
  return (
    <div>
      dsfa
      <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderInput={(props)=><input {...props}/>}
      placeholder=''

      
      
      />
      
    </div>
  )
}

export default Otp