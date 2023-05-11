"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@ui/lib/utils";
import { forwardRef } from "react";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        error:
          "text-red-400 animate-in slide-in-from-left-5 duration-200[&>input]:border-2 [&>input]:!ring-red-300 [&>input]:outline [&>input]:outline-2 [&>input]:outline-red-400",
      },
    },
  }
);
interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  errorMessage?: string;
}

const Label = forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(function Label(
  { className, variant, children, errorMessage, ...props },
  ref
) {
  return (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant }), className)} {...props}>
      {children}
      {variant === "error" && errorMessage && (
        <p role="alert" className="text-sm mt-2">
          {errorMessage}
        </p>
      )}
    </LabelPrimitive.Root>
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
