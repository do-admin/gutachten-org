import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider herokit-id="92262abb-d0f9-47f3-8d21-b0d5a1475efa">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            herokit-id="e09fdffc-52d0-4033-afc9-dbf3f3c2b196"
          >
            <div
              className="grid gap-1"
              herokit-id="be933e89-0e7b-4813-8d73-e1feed47e298"
            >
              {title && (
                <ToastTitle herokit-id="4ff2b8c9-a775-4216-8752-e5cb4ed9380c">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription herokit-id="ca9b35e0-8765-453a-b156-4e2a127d6a0f">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
