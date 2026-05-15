import { useEffect, useState } from "react"
import RegisterImage from '../assets/register.webp'
import { Link, useNavigate, useSearchParams } from "react-router-dom"; 
import {HiAnnotation}from "react-icons/hi"
import { registerUser } from "../redux/reduxSlices/auth";
import { useDispatch, useSelector } from "react-redux";
import { mergeCarts } from "../redux/reduxSlices/cart";
const Register = () => {
  const [name,setName]=useState();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [searchParams]=useSearchParams();
  const redirectPath=searchParams.get("redirect")
  const {user,guestId,loading}=useSelector(state=>state.auth);
 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    async function handelMerge(){
      
      if(user){
        try{
          if(guestId)
          await dispatch(mergeCarts(guestId)).unwrap();
        navigate(redirectPath=="checkout"?`/${redirectPath}`:'/',{replace:true})

        }catch(error){
          console.log(error);
          navigate("/",{replace:true})
        }
      }
    }
    handelMerge()
  },[user]);
  
  async function handelSubmit(e){
    e.preventDefault();
  try{
    await dispatch(registerUser({name,email,password})).unwrap();
   navigate('/')
  }catch(error){
    console.log(error)
  }
  }
 
  return (
    <div className="flex">
      {/* RIGHT - DIV */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center"> 
      <form action="" onSubmit={handelSubmit} className="border p-8 max-w-md rounded-lg text-center shadow-sm">
        <h2 className="text-xl font-semibold font-sans mb-4">StrearWear</h2>
        <h1 className="text-2xl font-bold mb-4">Hey There!👋🏻</h1>
        <p className="text-sm md:text-lg font-medium">Enter your email and password to Register</p>
        <div className="mt-4 text-left">
          <label htmlFor="name" className="font-semibold">Name</label>
          <input type="name" name=""
          placeholder="Please Enter Your Name"
          onChange={(e)=>setName(e.target.value)}
          value={name}
          className="border w-full p-2 mt-2 rounded focus:outline-black"  />
        </div>
        <div className="mt-4 text-left">
          <label htmlFor="email" className="font-semibold">Email</label>
          <input type="email" name=""
          placeholder="Please Enter Your Email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          className="border w-full p-2 mt-2 rounded focus:outline-black"  />
        </div>
        <div className="mt-4 mb-6 text-left">
          <label htmlFor="password" className="font-semibold">Password</label>
          <input type="password" name=""
          placeholder="Please Enter Your Password"
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
          className="border w-full p-2 mt-2 rounded focus:outline-black"  />
        </div>
        <button className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
          {loading?"Regitering...":"Sgin Up"}</button>
        <p className="text-sm mt-6">You have an account?
          <Link to={redirectPath?`/login?redirect=checkout`:'/login'} className="text-blue-500"> Login</Link> </p>
      </form>
      </div>

      {/* LEFT - DIV */}
      <div className="w-1/2 hidden lg:block">
        <img src={RegisterImage} className="w-full h-[650px] object-cover" />
      </div>
    </div>
  )
}

export default Register
