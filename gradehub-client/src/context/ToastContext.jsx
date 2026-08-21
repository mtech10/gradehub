import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    ({ title, message, type = "info", duration = 5000 }) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts((prev) => [...prev, { id, title, message, type }]);

      if (duration) {
        setTimeout(() => removeToast(id), duration);
      }
    },
    [],
  );

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const icons = {
    success: <CheckCircle2 className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertCircle className="text-amber-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  };

  const bgColors = {
    success: "bg-green-50 border-green-100",
    error: "bg-red-50 border-red-100",
    warning: "bg-amber-50 border-amber-100",
    info: "bg-blue-50 border-blue-100",
  };

  return (
    <div
      className={`flex w-100 items-start gap-3 rounded-xl border p-4 shadow-lg animate-in slide-in-from-right-8 fade-in duration-300 ${bgColors[toast.type]}`}
    >
      <div className="shrink-0 pt-1">{icons[toast.type]}</div>
      <div className="flex-1">
        <h4 className="text-lg font-bold text-slate-900">{toast.title}</h4>
        {toast.message && (
          <p className="mt-1 text-md text-slate-600">{toast.message}</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 text-slate-400 transition-colors hover:text-slate-700"
      >
        <X size={18} />
      </button>
    </div>
  );
}
