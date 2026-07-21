import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Floating Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => {
            let bgColor = "bg-white border-l-4 border-green-500 shadow-lg text-slate-800";
            let Icon = CheckCircle;
            let iconColor = "text-green-500";

            if (toast.type === "warning") {
              bgColor = "bg-white border-l-4 border-yellow-500 shadow-lg text-slate-800";
              Icon = AlertTriangle;
              iconColor = "text-yellow-500";
            } else if (toast.type === "error") {
              bgColor = "bg-white border-l-4 border-red-500 shadow-lg text-slate-800";
              Icon = XCircle;
              iconColor = "text-red-500";
            } else if (toast.type === "info") {
              bgColor = "bg-white border-l-4 border-blue-500 shadow-lg text-slate-800";
              Icon = Info;
              iconColor = "text-blue-500";
            }

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                className={`flex items-start gap-3 p-4 rounded-lg border border-slate-100 ${bgColor}`}
                id={`toast-${toast.id}`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
                <div className="flex-1 text-sm font-medium pr-2">
                  {toast.message}
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
