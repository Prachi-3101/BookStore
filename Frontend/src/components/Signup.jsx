import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    console.log(userInfo);
    toast.success("Signup successful");

    navigate(from, { replace: true });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
  <div className="w-96">
    <div className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-lg shadow-md relative">

      <Link
        to="/"
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </Link>

      <h3 className="font-bold text-lg">Signup</h3>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Name */}
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-6">
                <button className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200">
                  Signup
                </button>

                {/* FIXED: no <p>, no nested components */}
                <div className="text-sm">
                  <span>Have account? </span>
                  <button
                    type="button"
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
      <Login />
    </>
  );
}

export default Signup;