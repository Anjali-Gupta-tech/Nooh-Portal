import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export function DashboardCard({ title, description, icon: Icon, to }) {
  return (
    <Link
      to={to}
      className="group relative p-6 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-[#C9A227] hover:shadow-md transition-all duration-200 flex flex-col justify-between h-40"
      id={`module-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-gray-50 rounded-lg text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-white transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#C9A227] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider group-hover:text-[#C9A227] transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
}
