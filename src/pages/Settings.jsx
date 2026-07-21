import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../context/ToastContext";
import { PageHeader } from "../components/PageHeader";
import { Modal } from "../components/Modal";
import { ShieldCheck, Building, Key, Smartphone, Info, Upload } from "lucide-react";

export function Settings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("Profile");
  const [logoPreview, setLogoPreview] = useState("https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?auto=format&fit=crop&w=400&q=80");

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile }
  } = useForm({
    defaultValues: {
      companyName: "NOOH Living Pvt Ltd",
      email: "query@noohliving.com",
      phone: "+91 99990 XXXXX",
      address: "Plot No. 12, Phase-2, Gurgaon, Haryana"
    }
  });

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    reset: resetSecurity,
    formState: { errors: errorsSecurity }
  } = useForm();

  const handleUpdateProfile = (data) => {
    addToast("Company registration profile updated successfully!", "success");
  };

  const handleUpdatePassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      addToast("New password confirmation mismatch!", "error");
      return;
    }
    addToast("Portal administrator password updated successfully!", "success");
    resetSecurity();
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        addToast("Office asset uploaded successfully", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = ["Profile", "Security Credentials"];

  return (
    <div className="space-y-6" id="settings-page-root">
      <PageHeader
        title="Portal Configurations"
        description="Verify corporate office locations, asset files, invoice parameters, and password logs."
      />

      {/* Tab bar header */}
      <div className="flex border-b border-slate-100 pb-px gap-2 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold transition-all relative shrink-0 ${
              activeTab === tab
                ? "text-[#C9A227]"
                : "text-slate-400 hover:text-slate-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
            )}
          </button>
        ))}
      </div>

      {/* Conditional layouts based on active tabs */}
      <div className="max-w-3xl" id="settings-content-wrapper">
        {activeTab === "Profile" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            
            {/* Left Side: Mock Company Logo Drag & Drop */}
            <div className="md:col-span-1 bg-white border border-slate-100 rounded-xl p-5 shadow-xs space-y-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block text-left">
                Corporate Branding Logo
              </span>
              
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-150 flex items-center justify-center">
                <img
                  src={logoPreview}
                  alt="Company Logo Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="w-full cursor-pointer flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-250 hover:bg-slate-50 text-slate-600 text-xs font-bold rounded-lg transition-all">
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span>Change Logo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Right Side: Profile Form */}
            <form
              onSubmit={handleSubmitProfile(handleUpdateProfile)}
              className="md:col-span-2 bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Firm Name / Entity
                </label>
                <input
                  type="text"
                  {...registerProfile("companyName", { required: "Firm name is required" })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-bold"
                />
                {errorsProfile.companyName && <p className="text-xs text-rose-500 mt-1">{errorsProfile.companyName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Primary Office Telephone
                  </label>
                  <input
                    type="text"
                    {...registerProfile("phone", { required: "Telephone count is required" })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
                  />
                  {errorsProfile.phone && <p className="text-xs text-rose-500 mt-1">{errorsProfile.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                    Corporate Webmail
                  </label>
                  <input
                    type="email"
                    {...registerProfile("email", { required: "Webmail contact required" })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all font-semibold"
                  />
                  {errorsProfile.email && <p className="text-xs text-rose-500 mt-1">{errorsProfile.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Registered Head Office Address
                </label>
                <input
                  type="text"
                  {...registerProfile("address", { required: "Registered Address required" })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
                />
                {errorsProfile.address && <p className="text-xs text-rose-500 mt-1">{errorsProfile.address.message}</p>}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
                >
                  Save Profile Details
                </button>
              </div>
            </form>

          </div>
        ) : (
          /* Security credentials form */
          <form
            onSubmit={handleSubmitSecurity(handleUpdatePassword)}
            className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs space-y-4 animate-fadeIn"
          >
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Current Portal Password
              </label>
              <input
                type="password"
                {...registerSecurity("currentPassword", { required: "Current password is required" })}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
              />
              {errorsSecurity.currentPassword && <p className="text-xs text-rose-500 mt-1">{errorsSecurity.currentPassword.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  New Portal Password
                </label>
                <input
                  type="password"
                  {...registerSecurity("newPassword", { required: "New password is required" })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
                />
                {errorsSecurity.newPassword && <p className="text-xs text-rose-500 mt-1">{errorsSecurity.newPassword.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...registerSecurity("confirmPassword", { required: "Confirming password is required" })}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#C9A227] focus:outline-none transition-all"
                />
                {errorsSecurity.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errorsSecurity.confirmPassword.message}</p>}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#b08d20] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
