import React from "react";

export function Loader({ size = "md", label = "Loading data..." }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3" id="loader-container">
      <div
        className={`${sizeClasses[size]} border-[#C9A227]/20 border-t-[#C9A227] rounded-full animate-spin`}
        id="loader-spinner"
      />
      {label && <p className="text-sm font-medium text-slate-500 animate-pulse">{label}</p>}
    </div>
  );
}
