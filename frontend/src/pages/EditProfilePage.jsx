import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
const VITE_API_URL = import.meta.env.VITE_API_URL;
const EditProfilePage = () => {
  let [user, setUser] = useState(null);
  const { register, handleSubmit, formState } = useForm({
    values: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      city: user?.addresses[0]?.city || "",
      area: user?.addresses[0]?.area || "",
      building: user?.addresses[0]?.building || "",
      floor: user?.addresses[0]?.floor || "",
      postalCode: user?.addresses[0]?.postalCode || "",
      avatar: user?.avatar || "",
    },
  });
  const errors = formState.errors;
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get(
          `${VITE_API_URL}/streetwear/user/getProfile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          },
        );
        console.log(res.data);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, [setUser]);
  async function handleUpdateProfile(data) {
    console.log(data);
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append(
      "addresses",
      JSON.stringify([
        {
          city: data.city,
          area: data.area,
          building: data.building,
          floor: data.floor,
          postalCode: data.postalCode,
        },
      ]),
    );
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      addresses: [
        {
          city: data.city,
          area: data.area,
          building: data.building,
          floor: data.floor,
          postalCode: data.postalCode,
        },
      ],
    };
    try {
      const res = await axios.patch(
        `${VITE_API_URL}/streetwear/user/update-me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      toast.success("Profile updated successfully✅✅");
      setUser(res.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  }
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center  px-4 py-10">
      <form
        className="p-10 w-[75%] rounded-lg shadow-lg"
        onSubmit={handleSubmit(handleUpdateProfile)}
      >
        <div className="space-y-12">
          <div className="border-b border-black pb-12">
            <h2 className="text-3xl font-bold ">Profile</h2>
            <p className="mt-1 text-sm/6 ">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label for="username" className="block text-sm/6 font-medium ">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-gray-100 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-black-500">
                    <input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base  placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                      value={user?.name || ""}
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label for="cover-photo" class="block text-sm/6 font-medium ">
                  Profile Picture
                </label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div class="text-center">
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        alt="Profile Picture"
                        class="mx-auto size-36 rounded-full"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        data-slot="icon"
                        aria-hidden="true"
                        class="mx-auto size-12 text-gray-600"
                      >
                        <path
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        />
                      </svg>
                    )}
                    <div class="mt-4 flex text-sm/6 ">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-transparent font-semibold text-green-500 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-green-400"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          type="file"
                          name="file-upload"
                          class="sr-only"
                          {...register("avatar")}
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs/5 ">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-white/10 pb-12">
            <h2 class="text-xl/7 font-semibold ">Personal Information</h2>
            <p class="mt-1 text-sm/6 ">
              Use a permanent address where you can receive mail.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm/6 font-medium ">
                  Full name
                </label>
                <div class="mt-2">
                  <input
                    id="first-name"
                    type="text"
                    name="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                    {...register("name", {
                      required: "Full name is required",
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div class="sm:col-span-3">
                <label for="email" class="block text-sm/6 font-medium ">
                  Email address
                </label>
                <div class="mt-2">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autocomplete="email"
                    {...register("email", {
                      required: "Email is required",
                      email: "Please enter a valid email address",
                    })}
                    class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div class="sm:col-span-3">
                <label for="phone" class="block text-sm/6 font-medium ">
                  phone number
                </label>
                <div class="mt-2">
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    autocomplete="tel"
                    placeholder="+20 123 456 7890"
                    class="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                    pattern="[0-9+ ]{10,15}"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\+?[0-9\s\-\(\)]{10,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div class="col-span-4">
                <label for="city" class="block text-sm/6 font-medium ">
                  City
                </label>
                <div class="mt-2">
                  <input
                    id="city"
                    type="text"
                    name="city"
                    autocomplete="street-address"
                    class="block w-full rounded-md bg-gray-100 py-1.5 pr-8 pl-3 text-base  outline-1 -outline-offset-1 outline-white/10 *:bg-gray-100 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                    {...register("city", {
                      required: "City is required",
                    })}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              <div class="col-span-3">
                <label
                  for="street-address"
                  class="block text-sm/6 font-medium "
                >
                  Street address
                </label>
                <div class="mt-2">
                  <input
                    id="street-address"
                    type="text"
                    name="street-address"
                    autocomplete="street-address"
                    class="block w-full rounded-md bg-gray-100 py-1.5 pr-8 pl-3 text-base  outline-1 -outline-offset-1 outline-white/10 *:bg-gray-100 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                    {...register("area", {
                      required: "street is required",
                    })}
                  />
                </div>
                {errors.area && (
                  <p className="text-red-500 text-sm">{errors.area.message}</p>
                )}
              </div>
              <div class="col-span-3">
                <label for="building" class="block text-sm/6 font-medium ">
                  Building Number
                </label>
                <div class="mt-2">
                  <input
                    id="building"
                    type="number"
                    name="building"
                    autocomplete="street-address"
                    {...register("building", {
                      required: "Building number is required",
                    })}
                    class="block w-full rounded-md bg-gray-100 py-1.5 pr-8 pl-3 text-base  outline-1 -outline-offset-1 outline-white/10 *:bg-gray-100 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
              </div>
              <div class="col-span-3">
                <label for="floor" class="block text-sm/6 font-medium ">
                  Floor Number
                </label>
                <div class="mt-2">
                  <input
                    id="floor"
                    type="number"
                    name="floor"
                    autocomplete="street-address"
                    {...register("floor", {
                      required: "Floor number is required",
                    })}
                    class="block w-full rounded-md bg-gray-100 py-1.5 pr-8 pl-3 text-base  outline-1 -outline-offset-1 outline-white/10 *:bg-gray-100 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
                {errors.floor && (
                  <p className="text-red-500 text-sm">{errors.floor.message}</p>
                )}
              </div>
              <div class="sm:col-span-2">
                <label for="postal-code" class="block text-sm/6 font-medium ">
                  ZIP / Postal code
                </label>
                <div class="mt-2">
                  <input
                    id="postal-code"
                    type="text"
                    name="postal-code"
                    autocomplete="postal-code"
                    value={user?.addresses[0]?.postalCode || ""}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        addresses: [
                          { ...user.addresses[0], postalCode: e.target.value },
                        ],
                      })
                    }
                    class="block w-full rounded-md bg-gray-100 py-1.5 pr-8 pl-3 text-base  outline-1 -outline-offset-1 outline-white/10 *:bg-gray-100 focus:outline-2 focus:-outline-offset-2  sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/update-password"
            class="rounded-md bg-yellow-300  px-3 py-2 text-sm font-semibold  hover:bg-yellow-400 transition-all duration-300  "
          >
            Update Password
          </Link>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm/6 font-semibold hover:bg-red-500 rounded-md px-3 py-2 text-gray-900 transition-all duration-300 "
          >
            Cancel
          </button>

          <button
            type="submit"
            class="rounded-md  px-3 py-2 text-sm font-semibold  hover:bg-green-500 transition-all duration-300  "
          >
            Save
          </button>
        </div>
      </form>


    </div>
  );
};

export default EditProfilePage;
