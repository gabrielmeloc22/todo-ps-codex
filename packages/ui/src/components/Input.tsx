import { cn } from "@ui/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type, className, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        "flex rounded-lg bg-secondary px-3 py-2 text-sm ring-offset-background text-secondary-foreground file:border-0 [type=file]:bg-transparent file:bg-transparent file:text-sm file:text-secondary-foreground file:cursor-pointer file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
