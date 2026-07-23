import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({
  title,
  subtitle,
  buttonColor = "bg-[#C89B3C] hover:bg-[#b3872f]",
  accentColor = "#C89B3C",
  role 
}) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();
  console.log("ROLE =", role);
  // Temporary Login
  localStorage.setItem("nooh_auth", "true");

  // Save User Role
  localStorage.setItem("role", role);

  navigate("/app/home");
};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

        {/* Back */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo.svg"
            alt="NOOH"
            className="h-14 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: accentColor }}
          >
            {title}
          </h1>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link
              to="/forgot-password"
              className="text-[#C89B3C] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full ${buttonColor} text-white rounded-xl py-3 font-semibold transition`}
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}