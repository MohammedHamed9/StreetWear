import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner";
import axios from "axios";
const VITE_API_URL=import.meta.env.VITE_API_URL

const Forgetpassword = () => {
  const navigate=useNavigate();
  async function handleForgetPassword(e){
    const email=e.target.email.value;
    e.preventDefault();
    try{
      await axios.post(`${VITE_API_URL}/streetwear/user/forget-password`,{email});
      toast.success("The Token in sent to your email, please check your inbox.");
      navigate("/confirm-reset-password",{state:{email}});
    }catch(err){
      console.error(err);
      toast.error(err.response.data.message);
    }
  }
  return (
<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className="text-2xl text-center font-bold tracking-tight text-black">StreetWear</h1>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-8 rounded-lg shadow-sm">
    <h1 className="text-2xl font-bold leading-9 tracking-tight text-black text-center">Forgot your password?</h1>
    <p className="mt-4 text-center text-sm text-gray-500">Don't worry! Just enter your email and we'll send you a reset link.</p>
    
    <form action="" onSubmit={handleForgetPassword} method="POST" className="space-y-6">
      <div className="mt-5">
        <label htmlFor="email" className="block text-sm/6 font-medium text-black-100">Email address</label>
        <div className="mt-2">
          <input id="email" type="email"
           name="email"
            required 
            autoComplete="email"
             className="block w-full rounded-md
              bg-black/5 px-3 py-1.5 text-base
               text-black outline-1 -outline-offset-1
                outline-black placeholder:text-gray-500 
                focus:outline-2 focus:-outline-offset-2
                 focus:outline-black-500 sm:text-sm/6" />
        </div>
      </div>
      <div>
        <button type="submit"
         className="flex w-full justify-center rounded-md
          bg-red-500 px-3 py-1.5 text-sm/6 font-semibold
           text-white hover:bg-red-400 focus-visible:outline-2 
           focus-visible:outline-offset-2
            focus-visible:outline-red-500">Send Reset Link</button>
      </div>
    </form>
    <p className="mt-10 text-center text-sm text-gray-500">Remember your password? 
    <Link to={"/login"} className="font-semibold leading-6 text-red-500 hover:text-red-400 hover:underline"> Sign in</Link>
    </p>
  </div>
</div>
  )
}

export default Forgetpassword
