import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { Key, Mail, ShieldAlert } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      email: "admin@noohliving.com",
      password: "password"
    }
  });

  const onSubmit = async (data) => {
    // Mimic credentials checking
    if (data.email === "admin@noohliving.com" && data.password === "password") {
      localStorage.setItem("nooh_auth", "true");
      addToast("Welcome back! Signed in as Nandini Oberoi.", "success");
      navigate("/home");
    } else {
      addToast("Invalid email or password. Hint: admin@noohliving.com / password", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" id="login-root">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Company Gold Emblem Logo */}
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#C9A227] flex items-center justify-center text-white font-serif text-2xl font-bold shadow-md">
          N
        </div>
        <h2 className="mt-6 text-center text-2xl font-serif font-bold text-slate-900 tracking-wide">
          NOOH LIVING
        </h2>
        <p className="mt-2 text-center text-xs font-semibold uppercase text-[#C9A227] tracking-widest">
          ADMINISTRATION GATEWAY
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-gray-200 rounded-xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                Work Email Address
              </label>
              <div className="mt-2 relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Work email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format"
                    }
                  })}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-full placeholder-slate-400 focus:bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-all font-semibold"
                  placeholder="admin@noohliving.com"
                  id="email-input"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-[#C9A227] hover:underline"
                >
                  Forgot access?
                </Link>
              </div>
              <div className="mt-2 relative rounded-md shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-full placeholder-slate-400 focus:bg-white focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227] focus:outline-none transition-all font-semibold"
                  placeholder="••••••••"
                  id="password-input"
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Hint Notice */}
            <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-slate-500 text-[11px] font-medium leading-relaxed">
              <span className="font-bold text-slate-700">Quick Portal Credentials:</span>
              <br />
              Email: <code className="font-mono text-slate-800 bg-gray-100 px-1 rounded">admin@noohliving.com</code>
              <br />
              Password: <code className="font-mono text-slate-800 bg-gray-100 px-1 rounded">password</code>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-[#C9A227] hover:bg-[#b08d20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A227] disabled:opacity-55 transition-all"
                id="login-submit"
              >
                {isSubmitting ? "Verifying..." : "Access Internal Portal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
