import { cn } from "@ui/lib/utils";
import { forwardRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(function TextArea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md  bg-zinc-700 px-3 py-2 text-sm ring-offset-background resize-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
TextArea.displayName = "TextArea";

export { TextArea };
