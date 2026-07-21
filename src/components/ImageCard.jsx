import React from "react";
import { Eye, Video } from "lucide-react";

export function ImageCard({ title, subtitle, image, isVideo, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all duration-300"
      id={`image-card-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Image Area */}
      <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
        <img
          src={image}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Type Overlay */}
        {isVideo && (
          <div className="absolute top-3 right-3 p-1.5 bg-black/60 rounded-lg text-white">
            <Video className="w-4 h-4" />
          </div>
        )}

        {/* Hover Mask */}
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="p-3 bg-white text-slate-800 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
            <Eye className="w-5 h-5 text-[#C9A227]" />
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4">
        <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-[#C9A227] transition-colors">
          {title}
        </h4>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1 truncate">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
