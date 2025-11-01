 import Samvaad from "../assets/small samvaad.png"
 import { FaEye } from "react-icons/fa";
 import { FaEyeSlash } from "react-icons/fa";
 import { useState } from "react";
 import { toast } from 'react-hot-toast'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [hidePassword,setHidePassoword] = useState(true);
  const [hideConfirmPassword,setHideConfirmPassword] = useState(true);
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:""
  })
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler=async(event)=>{
    event.preventDefault();
    
    // Validate all fields are filled
    if(!formData.userName || !formData.email || !formData.password || !confirmPassword){
      toast.error("Please fill all fields")
      return;
    }
    
    // Validate password length
    if(formData.password.length<8){
      toast.error("Password must be at least 8 characters long")
      return;
    }
    
    // Validate passwords match
    if(formData.password !== confirmPassword){
      toast.error("Passwords do not match")
      return;
    }

    const data = {
      email:formData.email,

    }
    const toastId = toast.loading("loading...")
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/otp-create`,data)
      console.log(response);
      if(!response?.data?.success){
        throw new Error("Error in sending OTP")
      }
      toast.dismiss(toastId)
      setLoading(false);
      toast.success("OTP sent to your email",{id:toastId})
      navigate("/otp",{state:{signUpData:formData}})
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId)
      setLoading(false);
      toast.error(error.message,{id:toastId})
    }
  }

  return (
    <div className="h-screen flex justify-center items-center sm:p-0 p-4">
      <div className="bg-white w-[500px] shadow-md rounded-md">
      <div className="flex flex-col gap-4 px-4 py-12 rounded-md ">
        {/* Logo*/}
      <div className="flex flex-col justify-center items-center mb-5 mt-[-30px]">
        <img src={Samvaad} alt="Samvaad Logo" className="w-[200px]" />
      </div>
      {/* SignUp Form*/}
      <div>
        <form action="" className="flex flex-col gap-3" onSubmit={submitHandler}>
          <input required onChange = {onChangeHandler} name="userName" value={formData.userName} type="text" placeholder="Enter Your Name" className="px-3 py-1 outline-none border-2 border-gray-200 rounded-full"/>
          <input required onChange = {onChangeHandler} name="email" value={formData.email} type="email" placeholder="Enter Your Email" className="px-3 py-1 outline-none border-2 border-gray-200 rounded-full"/>
          <div className="relative">
          <input required onChange={onChangeHandler} name="password" value={formData.password} type={hidePassword ? "password" : "text"} placeholder="Enter Your Password" className="w-full px-3 py-1 outline-none border-2 border-gray-200 rounded-full"/>
          {
            hidePassword ? (<FaEyeSlash onClick={()=>{setHidePassoword((prev)=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>
            ):(<FaEye onClick={()=>{setHidePassoword(prev=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>)
          }
          </div>
          <div className="relative">
          <input required onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type={hideConfirmPassword ? "password" : "text"} placeholder="Confirm Your Password" className="w-full px-3 py-1 outline-none border-2 border-gray-200 rounded-full"/>
          {
            hideConfirmPassword ? (<FaEyeSlash onClick={()=>{setHideConfirmPassword((prev)=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>
            ):(<FaEye onClick={()=>{setHideConfirmPassword(prev=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>)
          }
          </div>
          <div className="flex justify-center items-center">
            <button disabled={loading} type="submit" className="px-4 py-1 bg-red-300 text-white hover:bg-red-400 transition-all duration-200 rounded-full">SignUp</button>
          </div>
          
        </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
