import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useUiStore } from "../../stores/uiStore";
import { Button } from "./Button";

export function ToastViewport() {
  const { toasts, dismissToast } = useUiStore();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((toast) => window.setTimeout(() => dismissToast(toast.id), 3600));
    return () => timers.forEach(window.clearTimeout);
  }, [dismissToast, toasts]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = toast.tone === "error" ? XCircle : toast.tone === "success" ? CheckCircle2 : Info;
        return (
          <div key={toast.id} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
            <Icon className={toast.tone === "error" ? "text-red-600" : toast.tone === "success" ? "text-emerald-600" : "text-sky-600"} size={20} />
            <div className="min-w-0 flex-1">
              <p className="font-bold text-navy-950">{toast.title}</p>
              {toast.description && <p className="mt-1 text-sm text-slate-600">{toast.description}</p>}
            </div>
            <Button aria-label="Dismiss toast" variant="ghost" className="h-11 w-11 p-0" onClick={() => dismissToast(toast.id)}>
              <X size={18} />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
