import React from "react";
import { FileText, Eye, Download } from "lucide-react";

export function PDFCard({ name, size, uploadDate, onView, onDownload }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm hover:border-[#C9A227]/30 transition-all gap-4" id={`pdf-card-${name.replace(/\s+/g, '-').toLowerCase()}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-2.5 bg-rose-50 text-rose-500 rounded-lg shrink-0 border border-rose-100/50">
          <FileText className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-slate-800 text-sm truncate" title={name}>
            {name}
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Size: {size} • Uploaded: {uploadDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {onView && (
          <button
            onClick={onView}
            className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-[#C9A227] rounded-lg border border-slate-100 transition-colors"
            title="Preview PDF"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
        {onDownload && (
          <button
            onClick={onDownload}
            className="p-1.5 hover:bg-slate-50 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-100 transition-colors"
            title="Download file"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
