import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface GlassmorphicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glow';
  hoverEffect?: boolean;
}

export const GlassmorphicCard = React.forwardRef<HTMLDivElement, GlassmorphicCardProps>(
  ({ className, variant = 'default', hoverEffect = true, children, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!hoverEffect || !cardRef.current) return;

      const card = cardRef.current;

      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          boxShadow: '0 20px 40px hsl(var(--primary) / 0.2)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 30px hsl(var(--primary) / 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [hoverEffect]);

    const variantStyles = {
      default: 'bg-card/60 backdrop-blur-xl border border-border/30',
      elevated: 'bg-card/80 backdrop-blur-xl border border-border/20 shadow-xl',
      bordered: 'bg-card/40 backdrop-blur-xl border-2 border-primary/20',
      glow: 'bg-card/60 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_hsl(var(--primary)/0.2)]',
    };

    return (
      <div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          'rounded-2xl p-6 transition-all duration-300',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassmorphicCard.displayName = 'GlassmorphicCard';
