import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center text-xs font-medium text-slate-500 mb-4" aria-label="Breadcrumb" id="breadcrumb-nav">
      <ol className="flex items-center space-x-1 md:space-x-2">
        <li className="flex items-center">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-[#C9A227] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>HQ</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 mx-1 shrink-0" />
              {isLast ? (
                <span className="text-slate-800 font-semibold truncate max-w-[150px] sm:max-w-none">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#C9A227] transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
