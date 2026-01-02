import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { Button, ButtonProps } from './button';

interface AnimatedButtonProps extends ButtonProps {
  glowOnHover?: boolean;
  bounceOnClick?: boolean;
  pulseEffect?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, glowOnHover = true, bounceOnClick = true, pulseEffect = false, children, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const button = buttonRef.current;
      if (!button) return;

      // Initial animation
      gsap.from(button, {
        scale: 0.95,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      // Hover animations
      const handleMouseEnter = () => {
        if (glowOnHover) {
          gsap.to(button, {
            boxShadow: '0 0 30px hsl(var(--primary) / 0.4)',
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          boxShadow: '0 4px 20px hsl(var(--primary) / 0.2)',
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [glowOnHover]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (bounceOnClick && buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.95 },
          { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
        );
      }
      onClick?.(e);
    };

    return (
      <Button
        ref={(node) => {
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          'relative overflow-hidden transition-all duration-300',
          pulseEffect && 'animate-pulse-glow',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
        {/* Shimmer effect */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      </Button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
