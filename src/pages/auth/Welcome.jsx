import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-sm border border-gray-200 p-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/images/logo.svg"
            alt="NOOH"
            className="h-14 object-contain"
          />
        </div>

        {/* Heading */}

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            Welcome to NOOH Portal
          </h1>

          <p className="text-gray-500 mt-3">
            Please choose how you want to continue
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin */}
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login/administration")}
            className="cursor-pointer rounded-2xl border border-emerald-200 bg-emerald-50 p-6 hover:shadow-lg transition h-full"
          >
            <div className="w-16 h-16 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>

            <h2 className="text-2xl font-semibold text-slate-800">
              Admin Login
            </h2>

            <p className="mt-2 text-gray-600">
              Login to access the NOOH Admin Portal.
            </p>
          </motion.div>
          {/* Staff */}
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login/staff")}
            className="cursor-pointer rounded-2xl border border-yellow-200 bg-yellow-50 p-6 hover:shadow-lg transition h-full"
          >
            <div className="w-16 h-16 rounded-xl bg-yellow-500 text-white flex items-center justify-center mb-6">
              <Users size={32} />
            </div>

            <h2 className="text-2xl font-semibold text-slate-800">
              Staff Login
            </h2>

            <p className="mt-2 text-gray-600">
              Login to access your staff account.
            </p>
          </motion.div>

          {/* Franchise */}
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/login/franchise")}
            className="cursor-pointer rounded-2xl border border-blue-200 bg-blue-50 p-6 hover:shadow-lg transition h-full"
          >
            <div className="w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6">
              <Building2 size={32} />
            </div>

            <h2 className="text-2xl font-semibold text-slate-800">
              Franchise Login
            </h2>

            <p className="mt-2 text-gray-600">
              Login to access your franchise account.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
