import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ConfirmResetToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  useEffect(() => {
    function handelEmail() {
      let updatedEmail =
        email.split("@")[0].slice(0, 3) + "****@" + email.split("@")[1];
      setEmail(updatedEmail);
    }
    handelEmail();
  }, [location.state?.email]);

  async function handleConfirmResetToken(e) {
    e.preventDefault();
    const token = e.target.token.value;
    try {
      const res = await axios.post(
        `${VITE_API_URL}/streetwear/user/checkResetToken`,
        { token },
      );
      console.log("Token is valid");
      toast.success("The token is valid, you can reset your password now.");
      navigate(`/reset-password/${token}`);
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-2xl text-center font-bold tracking-tight text-black">
          StreetWear
        </h1>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-8 rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold leading-9 tracking-tight text-black">
          Enter verification code
        </h1>
        <p className="mt-4 text-sm text-gray-500">
          For your security, we have sent the code to your email: {email}
        </p>

        <form
          action=""
          onSubmit={handleConfirmResetToken}
          method="POST"
          className="space-y-6"
        >
          <div className="mt-5">
            <label
              htmlFor="token"
              className="block text-sm/6 font-medium text-black-100"
            >
              Verification Code
            </label>
            <div className="mt-2">
              <input
                id="token"
                type="text"
                name="token"
                maxLength={6}
                minLength={6}
                required
                className="block w-full rounded-md
              bg-black/5 px-3 py-1.5 text-base
               text-black outline-1 -outline-offset-1
                outline-black placeholder:text-gray-500 
                focus:outline-2 focus:-outline-offset-2
                 focus:outline-black-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md
          bg-red-500 px-3 py-1.5 text-sm/6 font-semibold
           text-white hover:bg-red-400 focus-visible:outline-2 
           focus-visible:outline-offset-2
            focus-visible:outline-red-500"
            >
              Submit Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmResetToken;
