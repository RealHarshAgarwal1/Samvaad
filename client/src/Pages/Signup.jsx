 import Samvaad from "../assets/small samvaad.png"
 import { FaEye } from "react-icons/fa";
 import { FaEyeSlash } from "react-icons/fa";
 import { useState } from "react";

const Signup = () => {

  const [hidePassword,setHidePassoword] = useState(true);
  const [formData,setFormData] = useState({
    userName:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-[100vh] flex justify-center items-center sm:p-0 p-4">
      <div className="bg-white w-[500px] shadow-md rounded-md">
      <div className="flex flex-col gap-4 px-4 py-12 rounded-md ">
        {/* Logo*/}
      <div className="flex flex-col justify-center items-center mb-5 mt-[-30px]">
        <img src={Samvaad} alt="Samvaad Logo" className="w-[200px]" />
      </div>
      {/* SignUp Form*/}
      <div>
        <form action="" className="flex flex-col gap-3">
          <input required onChange = {onChangeHandler} name="userName" value={formData.userName} type="text" placeholder="Enter Your Name" className="px-3 py-1 outline-none border-[2px] border-gray-200 rounded-full"/>
          <input required onChange = {onChangeHandler} name="email" value={formData.email} type="email" placeholder="Enter Your Email" className="px-3 py-1 outline-none border-[2px] border-gray-200 rounded-full"/>
          <div className="relative">
          <input required onChange={onChangeHandler} name="password" value={formData.password} type={hidePassword ? "password" : "text"} placeholder="Enter Your Password" className="w-full px-3 py-1 outline-none border-[2px] border-gray-200 rounded-full"/>
          {
            hidePassword ? (<FaEyeSlash onClick={()=>{setHidePassoword((prev)=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>
            ):(<FaEye onClick={()=>{setHidePassoword(prev=>!prev)}} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"/>)
          }
          </div>
          <input type="password" placeholder="Confirm Your Password" className="px-3 py-1 outline-none border-[2px] border-gray-200 rounded-full"/>
          <div className="flex justify-center items-center">
            <button type="submit" className=" px-4 py-1 bg-red-300 text-white px-3 py-1 hover:bg-red-400 transition-all duration-200 rounded-full">SignUp</button>
          </div>
          
        </form>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;
