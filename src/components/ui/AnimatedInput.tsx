import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedInput - Playful input with animated label and focus effects
 */
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "peer w-full h-12 px-4 pt-4 pb-2 bg-card border-2 rounded-xl",
            "text-foreground placeholder:text-transparent",
            "border-border focus:border-primary focus:ring-2 focus:ring-primary/20",
            "transition-all duration-300 outline-none",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(e.target.value.length > 0);
          }}
          {...props}
        />
        <label
          className={cn(
            "absolute left-4 transition-all duration-300 pointer-events-none",
            "text-muted-foreground",
            (isFocused || hasValue || props.value) 
              ? "top-1 text-xs text-primary font-medium" 
              : "top-1/2 -translate-y-1/2 text-sm",
            error && "text-destructive"
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-destructive animate-slide-up">{error}</p>
        )}
      </div>
    );
  }
);
AnimatedInput.displayName = "AnimatedInput";

export { AnimatedInput };
