import React from "react";

export function StatusBadge({ status }) {
  const normalized = String(status).trim().toLowerCase();

  let colors = {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200"
  };

  // Green statuses
  if (
    normalized === "completed" ||
    normalized === "in stock" ||
    normalized === "active" ||
    normalized === "success"
  ) {
    colors = {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200"
    };
  }
  // Yellow/Orange statuses
  else if (
    normalized === "ongoing" ||
    normalized === "medium" ||
    normalized === "pending" ||
    normalized === "warning"
  ) {
    colors = {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200"
    };
  }
  // Red/Upcoming/Suspended statuses
  else if (
    normalized === "low stock" ||
    normalized === "suspended" ||
    normalized === "upcoming" ||
    normalized === "error" ||
    normalized === "high"
  ) {
    colors = {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200"
    };
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
      id={`status-badge-${normalized}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse" />
      {status}
    </span>
  );
}
