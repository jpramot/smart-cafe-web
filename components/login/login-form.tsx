"use client";

import { Role } from "@/enum/role";
import userStore from "@/hook/store/user-store";
import { loginSchema } from "@/libs/schema/login.schema";
import { type LoginForm } from "@/types/login.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function LoginForm() {
  const login = userStore((state) => state.login);
  const [role, setRole] = useState<Role>(Role.USER);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    const uesrRole = await login(data, role);
    if (uesrRole === Role.USER) {
      router.replace("/");
    } else {
      router.replace("/barista");
    }
  };

  return (
    <div className="flex justify-center items-center mt-20 bg-gray-50 p-6">
      <div className="w-full max-w-md shadow-lg rounded-2xl p-6 bg-white">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          {role === Role.USER ? "User Login" : "Barista Login"}
        </h1>

        {/* Role Switch */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              role === Role.USER ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole(Role.USER)}
          >
            User
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md ${
              role === Role.BARISTA ? "bg-green-700 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setRole(Role.BARISTA)}
          >
            Barista
          </button>
        </div>

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
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white rounded-md py-2 hover:bg-green-800 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {role === Role.USER
            ? "Login as customer to order drinks."
            : "Login as barista to manage orders."}
        </p>
        {role === Role.USER && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-green-700 font-medium hover:underline">
              Register
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
