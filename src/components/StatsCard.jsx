import React from "react";

export function StatsCard({ title, value, icon: Icon, badge, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-5 bg-white border border-gray-200 rounded-xl shadow-xs flex items-center justify-between gap-4 ${
        onClick ? "cursor-pointer hover:shadow-md hover:border-[#C9A227] transition-all duration-200" : ""
      }`}
      id={`stats-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </span>
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              badge.type === "danger" 
                ? "bg-red-100 text-red-600" 
                : "bg-green-100 text-green-600"
            }`}>
              {badge.label}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-slate-600 shrink-0">
        <Icon className="w-5 h-5 text-[#C9A227]" />
      </div>
    </div>
  );
}
