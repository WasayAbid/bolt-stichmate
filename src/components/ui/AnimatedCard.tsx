import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AnimatedCard - Playful card component with hover effects
 */
interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  hoverEffect?: 'bounce' | 'glow' | 'lift' | 'none';
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, variant = 'default', hoverEffect = 'lift', children, ...props }, ref) => {
    const variantClasses = {
      default: "bg-card",
      glass: "bg-card/60 backdrop-blur-md border-border/50",
      elevated: "bg-card shadow-lg",
      bordered: "bg-card border-2 border-primary/20",
    };

    const hoverClasses = {
      bounce: "hover-bounce",
      glow: "hover:shadow-lg hover:shadow-primary/20",
      lift: "hover:-translate-y-1 hover:shadow-xl",
      none: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border p-6 transition-all duration-300",
          variantClasses[variant],
          hoverClasses[hoverEffect],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AnimatedCard.displayName = "AnimatedCard";

/**
 * AnimatedCardHeader
 */
const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
AnimatedCardHeader.displayName = "AnimatedCardHeader";

/**
 * AnimatedCardTitle
 */
const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
AnimatedCardTitle.displayName = "AnimatedCardTitle";

/**
 * AnimatedCardDescription
 */
const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AnimatedCardDescription.displayName = "AnimatedCardDescription";

/**
 * AnimatedCardContent
 */
const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
AnimatedCardContent.displayName = "AnimatedCardContent";

/**
 * AnimatedCardFooter
 */
const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
AnimatedCardFooter.displayName = "AnimatedCardFooter";

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardFooter,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
};
