import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SparkleEffectProps {
  isActive: boolean;
  count?: number;
  colors?: string[];
  className?: string;
}

export const SparkleEffect: React.FC<SparkleEffectProps> = ({
  isActive,
  count = 20,
  colors = ['hsl(var(--gold))', 'hsl(var(--primary))', 'hsl(var(--mint))'],
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const sparkles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      sparkle.style.background = colors[i % colors.length];
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      container.appendChild(sparkle);
      sparkles.push(sparkle);

      const angle = (i / count) * Math.PI * 2;
      const distance = 50 + Math.random() * 100;

      gsap.fromTo(
        sparkle,
        {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 1,
        },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          scale: 1 + Math.random(),
          opacity: 0,
          duration: 0.8 + Math.random() * 0.4,
          ease: 'power2.out',
          delay: Math.random() * 0.2,
          onComplete: () => {
            sparkle.remove();
          },
        }
      );
    }

    return () => {
      sparkles.forEach((s) => s.remove());
    };
  }, [isActive, count, colors]);

  return <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`} />;
};

interface StitchingAnimationProps {
  isActive: boolean;
  className?: string;
}

export const StitchingAnimation: React.FC<StitchingAnimationProps> = ({
  isActive,
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isActive || !svgRef.current) return;

    const path = svgRef.current.querySelector('path');
    if (!path) return;

    const length = path.getTotalLength();
    
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.inOut',
      repeat: -1,
    });
  }, [isActive]);

  if (!isActive) return null;

  return (
    <svg
      ref={svgRef}
      className={`absolute pointer-events-none ${className}`}
      width="100%"
      height="100%"
      viewBox="0 0 400 100"
    >
      <path
        d="M10,50 Q50,20 90,50 T170,50 T250,50 T330,50 T390,50"
        stroke="hsl(var(--gold))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="5,10"
      />
    </svg>
  );
};

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
};

interface GlowingProgressProps {
  progress: number;
  className?: string;
}

export const GlowingProgress: React.FC<GlowingProgressProps> = ({
  progress,
  className = '',
}) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: 'power2.out',
    });
  }, [progress]);

  return (
    <div className={`relative h-2 bg-muted rounded-full overflow-hidden ${className}`}>
      <div
        ref={barRef}
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-gold rounded-full shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
        style={{ width: 0 }}
      />
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent animate-shimmer" />
    </div>
  );
};
