import { useEffect, useState } from "react"
import loginImage from "../assets/login.webp"
import { Link, redirect, useLocation, useNavigate, useSearchParams } from "react-router-dom"; 
import {useDispatch, useSelector} from "react-redux"
import {loginUser}from "../redux/reduxSlices/auth"
import { mergeCarts } from "../redux/reduxSlices/cart";
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const [searchParams]=useSearchParams()
    const redirectPath=searchParams.get('redirect')||""
    const {user,guestId,loading}=useSelector(state=>state.auth);
    const {cart}=useSelector(state=>state.cart);
 
    useEffect(()=>{
      async function handelMerge(){
        if(user){
        try{
          if(cart?.products.length>0 && guestId ){
          await dispatch(mergeCarts(guestId)).unwrap();
        }
        navigate(redirectPath=="checkout"?`/${redirectPath}`:"/",{replace:true})
        }catch(error){
          console.error("Error during post-login flow:", error);
          navigate("/",{replace:true});
        }
      }
      }
      handelMerge()
  },[user]);

  async function handelSubmit(e){
    e.preventDefault();
    try{
  await dispatch(loginUser({ email, password })).unwrap(); 
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex">
        {/* RIGHT-DIV */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 ">
        <form action="" onSubmit={handelSubmit} className="w-full max-w-md  p-8 rounded-lg border shadow-sm">
            <h2 className="text-xl font-sans font-medium text-center mb-4">StreatWear</h2>
            <h2 className="text-2xl font-bold text-center mb-6">Hey There!👋🏻</h2>
            <p className="text-center font-medium mb-6">Enter your username and password to login</p>
            <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">Email</label>
            <input type="email" name="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="border rounded w-full p-2 "/>
            </div>
            <div className="mb-4" >
            <label htmlFor="password" className="block  font-semibold mb-2">Password</label>
            <input type="password" name="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter Your Password"
            className="border rounded w-full p-2 "/>
            </div>
            <button type="submit" className="bg-black text-white text-sm w-full py-3
             rounded-lg mb-6 hover:bg-gray-800 transition">
              {loading?"Loading...":"Sgin in"}</button>
            <p className="text-center text-sm font-medium">
                Don't have an account? 
                <Link to={redirect?"/register?redirect=checkout":"/register"} className="text-blue-500"> Register</Link></p>
        </form>

      </div>

    {/* LEFT-DIV */}
      <div className="hidden md:block w-1/2 ">
        <img src={loginImage} alt="Login" className="h-[650px] w-full object-cover"/>
      </div>
    </div>
  )
}

export default Login
