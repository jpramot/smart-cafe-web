"use client";

import { userRegister } from "@/libs/apis/auth";
import { authRegisterSchema } from "@/libs/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(authRegisterSchema) });

  const onSubmit = async (data: z.infer<typeof authRegisterSchema>) => {
    try {
      const response = await userRegister(data);
      toast.success(response.message);
      router.replace("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error("Please try again");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 bg-gray-50 p-6">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">Create Account</h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 text-gray-700 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message as string}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white rounded-md py-2 hover:bg-green-800 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-green-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
