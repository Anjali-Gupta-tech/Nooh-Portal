import React from "react";
import { Search, X } from "lucide-react";

export function SearchBar({ value, onChange, placeholder = "Search records...", onClear }) {
  return (
    <div className="relative flex-1 max-w-md w-full" id="search-bar-wrapper">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-gray-200 rounded-full placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C9A227] focus:border-[#C9A227] transition-all"
        id="search-bar-input"
      />
      {value && onClear && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600 p-0.5"
          id="search-bar-clear"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
