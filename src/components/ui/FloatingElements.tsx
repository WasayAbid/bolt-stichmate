import React from 'react';
import { Scissors, Pin, Sparkles } from 'lucide-react';

/**
 * FloatingElements - Animated decorative elements for backgrounds
 * Creates a playful atmosphere with floating sewing-related icons
 */
export const FloatingElements: React.FC<{ variant?: 'default' | 'minimal' }> = ({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Thread Spools */}
      <div className="absolute top-20 left-[10%] w-8 h-8 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-mint/30 animate-float-delayed" />
      <div className="absolute bottom-32 left-[20%] w-10 h-10 rounded-full bg-gold/20 animate-float-slow" />
      
      {/* Floating Icons */}
      <Scissors className="absolute top-1/4 right-[25%] w-8 h-8 text-primary/30 animate-float rotate-45" />
      <Pin className="absolute bottom-1/3 left-[30%] w-6 h-6 text-coral/30 animate-float-delayed" />
      <Sparkles className="absolute top-1/2 right-[10%] w-7 h-7 text-gold/40 animate-sparkle" />
      
      {variant === 'default' && (
        <>
          {/* Additional elements for full variant */}
          <div className="absolute top-1/3 left-[5%] w-4 h-4 rounded-full bg-lavender/30 animate-bounce-soft" />
          <div className="absolute bottom-1/4 right-[30%] w-5 h-5 rounded-full bg-rose/20 animate-float" />
          <Scissors className="absolute bottom-20 right-[20%] w-6 h-6 text-secondary-foreground/20 animate-float-slow -rotate-12" />
          
          {/* Decorative Lines (threads) */}
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,100 Q200,50 400,100 T800,100"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              className="animate-thread-wave"
            />
            <path
              d="M0,300 Q300,250 600,300 T1200,300"
              stroke="hsl(var(--gold))"
              strokeWidth="1.5"
              fill="none"
              className="animate-thread-wave"
              style={{ animationDelay: '0.5s' }}
            />
          </svg>
        </>
      )}
    </div>
  );
};

/**
 * ConfettiEffect - Celebratory confetti animation
 */
export const ConfettiEffect: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (!isActive) return null;

  const colors = ['bg-primary', 'bg-gold', 'bg-mint', 'bg-coral', 'bg-lavender', 'bg-rose'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 ${colors[i % colors.length]} rounded-sm animate-confetti`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * GlowingOrb - Decorative glowing sphere
 */
export const GlowingOrb: React.FC<{ 
  color?: 'primary' | 'gold' | 'mint';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ color = 'primary', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  };

  const colorClasses = {
    primary: 'bg-primary/30',
    gold: 'bg-gold/30',
    mint: 'bg-mint/30',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        rounded-full blur-3xl animate-pulse-glow
        ${className}
      `}
    />
  );
};
