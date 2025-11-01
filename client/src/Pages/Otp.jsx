import React from 'react'
import { useLocation } from 'react-router-dom'

const Otp = () => {
  const location = useLocation();
  const signUpData = location.state.signUpData;
  return (
    <div>otp</div>
  )
}

export default Otp