import { cn } from "../../lib/utils";
import { HTMLAttributes, forwardRef } from "react";

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "backdrop-blur-md border rounded-lg",
          {
            'bg-gray-900/40 border-gray-700/50 shadow-lg': variant === 'default',
            'bg-gray-800/60 border-gray-600/60 shadow-xl': variant === 'elevated',
            'bg-gray-900/20 border-gray-800/30 shadow-sm': variant === 'subtle',
          },
          className
        )}
        {...props}
      />
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };