import React from "react";

export function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-5 border-b border-gray-200 mb-6" id="page-header">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-sans" id="page-header-title">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-500 mt-1" id="page-header-desc">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center shrink-0" id="page-header-action">{action}</div>}
    </div>
  );
}
