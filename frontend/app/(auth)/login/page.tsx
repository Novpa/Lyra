"use client";

import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "./_schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/actions/login-user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const res = await loginUser(data);
    console.log("res", res);

    if (!res.success) {
      toast.error(res.error);
    } else {
      toast.success("You are logging in!");
      router.push("/");
    }
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-neutral-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-brand-neutral-200 p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-brand-neutral-800">
          Login to your account
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Input Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-neutral-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-brand-neutral-300 bg-white p-2.5 text-brand-neutral-800 focus:border-brand-olive-500 focus:outline-none"
              placeholder="name@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Input Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-brand-neutral-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full rounded-lg border border-brand-neutral-300 bg-white p-2.5 text-brand-neutral-800 focus:border-brand-olive-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-brand-olive-600 px-4 py-2.5 text-white font-medium hover:bg-brand-olive-700 transition disabled:opacity-50">
            {isSubmitting ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
