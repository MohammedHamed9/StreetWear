import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Watch } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const { register, handleSubmit, watch, formState } = useForm();
  const errors = formState.errors;

  async function handleConfirmResetToken(data) {
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;
    try {
      const res = await axios.post(
        `${VITE_API_URL}/streetwear/user/reset-password/${token}`,
        { password, passwordConfirm },
      );
      toast.success("the passoword is reseted successfully ");
      navigate(`/login`);
    } catch (err) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  }
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-2xl text-center font-bold tracking-tight text-black">
            StreetWear
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border p-8 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold leading-9 tracking-tight text-black">
            Create new password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            We'll ask for this password whenever you <br />
            sign in.
          </p>

          <form
            action=""
            onSubmit={handleSubmit(handleConfirmResetToken)}
            method="POST"
            className="space-y-6"
          >
            <div className="mt-5">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-black-100"
              >
                New password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                  })}
                  className="block w-full rounded-md
              bg-black/5 px-3 py-1.5 text-base
               text-black outline-1 -outline-offset-1
                outline-black placeholder:text-gray-500 
                focus:outline-2 focus:-outline-offset-2
                 focus:outline-black-500 sm:text-sm/6"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm/6 font-medium text-black-100"
              >
                Re-enter password
              </label>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  required
                  {...register("passwordConfirm", {
                    required: "Type your password again",
                    validate: (value) => {
                      if (value !== watch("password"))
                        return "Passwords do not match";
                    },
                  })}
                  className="block w-full rounded-md
              bg-black/5 px-3 py-1.5 text-base
               text-black outline-1 -outline-offset-1
                outline-black placeholder:text-gray-500 
                focus:outline-2 focus:-outline-offset-2
                 focus:outline-black-500 sm:text-sm/6"
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md
          bg-green-500 px-3 py-1.5 text-sm/6 font-semibold
           text-white hover:bg-green-400 focus-visible:outline-2 
           focus-visible:outline-offset-2
            focus-visible:outline-green-500"
              >
                Submit Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
