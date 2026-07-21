import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { Mail, ArrowLeft, Send, ShieldCheck } from "lucide-react";

export function ForgotPassword() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
    addToast(`Security token dispatched to ${data.email}`, "success");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" id="forgot-root">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-[#C9A227] flex items-center justify-center text-white font-serif text-2xl font-bold shadow-md">
          N
        </div>
        <h2 className="mt-6 text-center text-2xl font-serif font-bold text-slate-800 tracking-wide">
          Reset Credentials
        </h2>
        <p className="mt-2 text-center text-xs font-semibold uppercase text-slate-400 tracking-widest">
          Secure Account Recovery
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 rounded-xl sm:px-10">
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <p className="text-xs text-slate-500 leading-relaxed">
                Provide your registered staff email address, and we will dispatch a secure link to reset your administrative portal credentials.
              </p>
              
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
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-transparent rounded-xl placeholder-slate-400 focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
                    placeholder="architect@noohliving.com"
                    id="recovery-email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-rose-500 font-semibold">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#C9A227] hover:bg-[#b08d20] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A227] disabled:opacity-55 transition-all"
                  id="send-recovery"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Dispatching..." : "Send Reset Token"}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center border border-green-100">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Check Your Inbox</h3>
              <p className="text-xs text-slate-500 leading-relaxed px-2">
                We have dispatched a secure recovery token. Please click the link inside the mail to define a new portal password.
              </p>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-slate-50">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login gate</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
