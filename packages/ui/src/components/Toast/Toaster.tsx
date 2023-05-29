"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@ui/components/Toast/Toast";
import { useToast } from "@ui/components/Toast/useToast";
import { Check, X } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, icon, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            {variant !== "default" && !icon && (
              <div className="rounded-full border border-zinc-100 p-1">
                {variant === "success" && <Check size={16} />}
                {variant === "destructive" && <X size={16} />}
              </div>
            )}
            {icon}
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
