import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

export function ConfirmationDialog({
  isOpen,
  onClose,
  title = "Are you sure?",
  message = "This action cannot be undone. Please confirm to proceed.",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) {
  const btnColor = {
    danger: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500",
    warning: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-400",
    info: "bg-[#C9A227] hover:bg-[#b08d20] focus:ring-[#C9A227]/50"
  }[type];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center py-2" id="conf-dialog">
        <div className={`p-3 rounded-full mb-4 ${type === "danger" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-500"}`}>
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-sm text-slate-600 mb-6 px-2">{message}</p>
        
        <div className="flex items-center justify-center gap-3 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${btnColor} transition-all`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
