import React from "react";
import { Inbox } from "lucide-react";

export function EmptyState({
  title = "No records found",
  description = "There are no matching entries in this section.",
  icon: Icon = Inbox,
  action
}) {
  return (
    <div
      className="flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 border border-dashed border-gray-200 rounded-xl"
      id="empty-state-container"
    >
      <div className="p-4 bg-white rounded-full shadow-sm border border-gray-100 text-slate-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
