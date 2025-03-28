"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
type FormData = {
  name: string;
  email: string;
  password: string;
  photoURL: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 text-center mt-24">
        Please Register
      </h2>
      <div className="max-w-[600px] mx-auto p-6 bg-white rounded-lg shadow-md border mt-12 mb-24">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your photoURL"
            />
            {errors.photoURL && (
              <p className="text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border bg-green-100 text-green-600 border-green-200 font-bold p-2 rounded-md mt-10"
          >
            Register
          </button>
        </form>
        <h1 className=" mt-4 text-slate-500">
          Already have an account?{" "}
          <Link
            href="/authentication/login"
            className="font-bold text-blue-500"
          >
            Login
          </Link>
        </h1>
        <div className="border-b-2 mt-8"></div>
        <h1 className="font-bold mt-8 text-center text-slate-500">
          Or Register Using
        </h1>
        <button className="text-3xl ml-[260px] mt-2">
          <FcGoogle />
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
